terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.0.0"
    }
  }

  backend "s3" {
    bucket       = "k3-tfstates"
    key          = "anaya-express-backend/terraform.tfstate"
    region       = "ap-south-1"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region = "ap-south-1"
}

resource "aws_iam_role" "lambda_exec_role" {
  name = "anaya-express-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "lambda.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "express_func" {
  function_name = "anaya-express-lambda"
  role          = aws_iam_role.lambda_exec_role.arn
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  filename      = "${path.module}/../build.zip"
  source_code_hash = filebase64sha256("${path.module}/../build.zip")
  timeout       = 30
  memory_size   = 512

  environment {
    variables = {
      NODE_ENV              = var.node_env
      DATABASE_URL          = var.database_url
      CLERK_SECRET_KEY      = var.clerk_secret_key
      CLERK_PUBLISHABLE_KEY = var.clerk_publishable_key
      SIGNING_SECRET        = var.signing_secret
    }
  }
}

resource "aws_lambda_function_url" "lambda_url" {
  function_name      = aws_lambda_function.express_func.function_name
  authorization_type = "NONE"
}

output "lambda_url" {
  value = aws_lambda_function_url.lambda_url.function_url
}
