variable "node_env" {
  type        = string
  default     = "prod"
}

variable "database_url" {
  type        = string
  sensitive   = true
}

variable "clerk_secret_key" {
  type        = string
  sensitive   = true
}

variable "clerk_publishable_key" {
  type        = string
  sensitive   = true
}

variable "signing_secret" {
  type        = string
  sensitive   = true
}
