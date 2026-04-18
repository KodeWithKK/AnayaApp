variable "node_env" {
  type    = string
  default = "prod"
}

variable "database_url" {
  type      = string
  sensitive = true
}

variable "better_auth_secret" {
  type      = string
  sensitive = true
}

variable "better_auth_url" {
  type = string
}

variable "google_client_id" {
  type = string
}

variable "google_client_secret" {
  type      = string
  sensitive = true
}

variable "smtp_host" {
  type = string
}

variable "smtp_port" {
  type = string
}

variable "smtp_user" {
  type = string
}

variable "smtp_pass" {
  type      = string
  sensitive = true
}

variable "smtp_from" {
  type = string
}
