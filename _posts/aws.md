---
title: 'aws'
excerpt: ''
coverImage: '/assets/covers/aws.jpg'
ogImage:
  url: '/assets/covers/aws.jpg'
---



# AWS CLI
- Installing the AWS CLI [Docs here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- For macOS [download](https://awscli.amazonaws.com/AWSCLIV2.pkg)
  - You can install to any folder, or choose the recommended default folder of `/usr/local/aws-cli`.
  - The installer automatically creates a symlink at `/usr/local/bin/aws` that links to the main program in the installation folder you chose.
- Check to see if it's installed properly
  ```shell
  $ which aws
  /usr/local/bin/aws 
  $ aws --version
  aws-cli/2.4.5 Python/3.8.8 Darwin/18.7.0 botocore/2.4.5
  ```
- You can access your AWS services via:
  1. Named profiles
    - AWS uses `~./aws/credentials` file for accessing your AWS accounts where you can have multiple profiles but you should probably have a `default` profile
      ```shell
      [default]
      aws_access_key_id=AAAAAAAAAAAAAEXAMPLE
      aws_secret_access_key=123456789123456789

      [user1]
      aws_access_key_id=BBBBBBBBBBBBBEXAMPLE
      aws_secret_access_key=12345678923456789
      ```
    - You can also define the default regions for each profile in `~/.aws/config`
      ```shell
      [default]
      region=us-west-2
      output=json

      [profile user1]
      region=us-east-1
      output=text
      ```
    - Accessing a specific profile's resources you just have to pass in the `--profile <PROFILE_NAME>`
      ```shell
      $ aws s3 ls --profile default
      ```
  2. Environment variables
    - You can also pass in environment variables access key/secrets
      ```shell
      $ export AWS_ACCESS_KEY_ID=BBBBBBBBBBBBBEXAMPLE
      $ export AWS_SECRET_ACCESS_KEY=12345678923456789
      $ export AWS_DEFAULT_REGION=us-west-2
      ```
- Now, getting your `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` values
  1.  Go to Amazon Web Services console and click on the name of your account (it is located in the top right corner of the console). Then, in the expanded drop-down list, select `Security Credentials`.
    ![Security Page](public/assets/blog/aws/credentials_1.jpg)
  2. Click the `Access keys (access key ID and secret access key)` accordion title and click `Create New Access Key`
    ![Security Page](public/assets/blog/aws/credentials_2.jpg)
  3. Click `Show Access Key` to have it displayed on the screen. Note, that you can download it to your machine as a file and open it whenever needed. To download it, just click the `Download Key File` button.
    ![Security Page](public/assets/blog/aws/credentials_2.jpg)
  4. Now update your `~/.aws/credentials` file with this key pair
    ```shell
    [default]
    aws_access_key_id=AAAAAAAAAAAAAEXAMPLE
    aws_secret_access_key=123456789123456789
    ```




# S3
- Storage


# CLoudFront
- Distribute your static content at AWS edge locations




# ACM
- AWS Certificate Manager is a service provided by Amazon that issues on-demand TLS certificates at no cost. Much like Let’s Encrypt, Amazon controls the Certificate Authority (Amazon Trust Services, LLC) behind the certificates, as well as the accompanying API to manage them.
- Amazon Certificate Manager (ACM) provides an elegant wayt to convert  a cumbersome multi-step process (the process of provisioning, validating, and configuring Transport Layer Security (TLS) certificates) into a single step
- ACM certificates can only be associated with AWS Elastic and Application Load Balancers, CloudFront distributions, and API Gateway endpoints.


# Route53


# API Gateway
- Allows you to make RESTful applications


# Lambda
- Serverless functions


# DynamoDB
- DynamoDB is a NoSQL database service


# RDS
- Relational Database Service (RDS)


# Aurora DB
- MySQL and PostgreSQL-compatible relational database built for the cloud. Performance and availability of commercial-grade databases at 1/10th the cost.
- Amazon Aurora is a MySQL and PostgreSQL-compatible relational database built for the cloud, that combines the performance and availability of traditional enterprise databases with the simplicity and cost-effectiveness of open source databases.
- Amazon Aurora is up to five times faster than standard MySQL databases and three times faster than standard PostgreSQL databases.
- DB normally run on an EC and it a pain to scale
- Aurora scale automatically, 
- Aurora make 6 copies of your data distributes around multiple locations
- Continuously backs it up to S3 so your data is safe
- Aurora can also replicate around multiple regions
- It's fully managed 
- Aurora comes in 2 flavors
  - Aurora Basic
  - Aurora Serverless (scales as much as you need and shuts down when you don't need it)
- Aurora uses a data API to access the data, which is different to how you normally connect to a relational database (via connections)
  - Working with Relational Database you have to connect to the DB, do your operations, then closing the connections
  - In the world of Serverless it become a little problematic cause you can have multiple lambda functions and they will all be handling the connections independenly which can lead to problems in your database like running out of open connections, your killing the memory, making it preform really bad
  - You can use an AWS Proxy that sits between your Database and your lambda functions and will handle the connections 
  - You should really just use this if you have legacy DB
  - If you are building a new application, just use the Aurora Serverless and save yourself the headache
- DynamoDB used the model of accessing the DB via the API
- In the serverless world dealing with DB connections is a pain,  





















# Terraform (Infrastructure as Code) to build out your services
- Why? 
  - To document all the services that are being used
  - Repeatable & reusable solution
  - Tare down all the services created with Terraform because TF creates an inventory of all the services in a state file

# Terraform for a client-side static web application


## The variable file
- This file is the only `.tf` file where you need to update values the rest of the `.tf` files are totally project agnostic
  ```hcl
  # (./varables.tf)
  #-------------------------------------------
  # Required variables (values passed in via command)
  #-------------------------------------------
  variable domain_name {}
  variable hosted_zone_name {}
  variable env_tags {}

  #-------------------------------------------
  # TF version & State file config
  #-------------------------------------------
  terraform {
    backend "s3" {
      key    = "<YOUR_PROJECT_NAME_HERE>" # this will define the TF state file
      region = "us-west-2"
    }
    required_version = ">= 0.13.5"
    required_providers {
      aws = {
        source  = "hashicorp/aws"
        version = "~>3.4"
      }
    }
  }

  #-------------------------------------------
  # Default region
  #-------------------------------------------
  variable "region" {
    default = "us-west-2"
  }
  provider "aws" {
    region = var.region
  }

  #-------------------------------------------
  # Interpolated Values
  #-------------------------------------------
  locals {
    bucket_name = "${var.domain_name}"
    domain_name = "${var.domain_name}"
  }

  #-------------------------------------------
  # Data
  #-------------------------------------------
  data "aws_caller_identity" "current" {}
  ```


## S3
- Use S3 to store the static web files and a second bucket for logging
  ```hcl
  # (./s3.tf)
  resource "aws_s3_bucket" "site" {
    bucket = local.bucket_name
    acl    = "private"
    policy = data.aws_iam_policy_document.website_s3_policy.json

    website {
      index_document = "index.html"
      error_document = "404.html"
    }

    tags = {
      Environment = var.env_tags
      Created_with = "Terraform"
    }
  }

  resource "aws_s3_bucket" "log_bucket" {
    bucket = "${local.bucket_name}-logs"
    acl    = "log-delivery-write"
  }
  ```

## Policies
- This policie only allows access via CloudFront to serve the webcontent
  ```hcl
  # (./policies.tf)
  data "aws_iam_policy_document" "website_s3_policy" {
    statement {
      actions   = ["s3:GetObject"]
      resources = ["arn:aws:s3:::${local.bucket_name}/*"]

      principals {
        type        = "AWS"
        identifiers = ["${aws_cloudfront_origin_access_identity.website_origin_access_identity.iam_arn}"]
      }
    }
  }
  ```
## Route53
- Make sure that you purchase your domain name beforehand because we will need the Hosted Zone Id
- We will use TF to create an `A` record to connect to the CloudFront instance
  ```hcl
  # (./route53.tf)
  resource "aws_route53_record" "domain" {
    name    = local.domain_name
    zone_id = data.aws_route53_zone.base.zone_id
    type    = "A"
    alias {
      name                   = aws_cloudfront_distribution.website_cdn.domain_name
      zone_id                = aws_cloudfront_distribution.website_cdn.hosted_zone_id
      evaluate_target_health = true
    }
  }

  data "aws_route53_zone" "base" {
    name         = "${var.hosted_zone_name}."
    private_zone = false
  }
  ```
## ACM for certs
- ACM provides an elegant wayt to convert  a cumbersome multi-step process into a single step, however when combined with Terraform this process is a little more complex because some processes have to happen in senquential steps
- Some of the TF modules include:
  - `aws_acm_certificate`: To request a certificate for example.com
  - `aws_route53_record`: To create a DNS record to validate the certificate request
  - `aws_certificate_validation`: To ensure that ACM validates our DNS record before certificate use
- In an effort to reduce the timming steps, [azavea's team](https://www.azavea.com/) assembled a reusable [Terraform module](https://github.com/azavea/terraform-aws-acm-certificate) to encapsulate the ACM and Route 53 resources used. Using the output from the validation resource ensures that Terraform will wait for ACM to validate the certificate before resolving its ARN. Now, the process of creating, validating, and waiting for a valid certificate looks like this:
  ```hcl
  # (./certs.tf)
  data "aws_route53_zone" "base" {
    name         = "${var.hosted_zone_name}."
    private_zone = false
  }

  provider "aws" {
    region = "us-east-1"
    alias  = "certificates"
  }

  provider "aws" {
    region = var.region
    alias  = "dns"
  }

  module "cert" {
    source = "github.com/azavea/terraform-aws-acm-certificate?ref=3.0.0"

    providers = {
      aws.acm_account     = aws.certificates
      aws.route53_account = aws.dns
    }

    domain_name                       = local.domain_name
    hosted_zone_id                    = data.aws_route53_zone.base.zone_id
    validation_record_ttl             = "60"
    allow_validation_record_overwrite = true
  }

  resource "aws_route53_record" "domain" {
    name    = local.domain_name
    zone_id = data.aws_route53_zone.base.zone_id
    type    = "A"
    alias {
      name                   = aws_cloudfront_distribution.website_cdn.domain_name
      zone_id                = aws_cloudfront_distribution.website_cdn.hosted_zone_id
      evaluate_target_health = true
    }
  }
  ```

# CloudFront
- CloudFront allows for global distribution of our web content with the ability to cache content at AWS edge locations
- The CloudFront configuration is kind of a beast
  ```hcl
  # (./cloudfront.tf)
  resource "aws_cloudfront_origin_access_identity" "website_origin_access_identity" {
    comment = "site ${terraform.workspace} Access Identity"
  }


  resource "aws_cloudfront_distribution" "website_cdn" {
    origin {
      domain_name = aws_s3_bucket.site.bucket_regional_domain_name
      origin_id   = "origin-bucket-${aws_s3_bucket.site.id}"

      s3_origin_config {
        origin_access_identity = aws_cloudfront_origin_access_identity.website_origin_access_identity.cloudfront_access_identity_path
      }
    }

    enabled             = true
    is_ipv6_enabled     = true
    default_root_object = "index.html"

    logging_config {
      include_cookies = false
      bucket          = aws_s3_bucket.log_bucket.bucket_domain_name
      prefix          = "cloudfront_logs"
    }

    aliases = [local.domain_name]

    default_cache_behavior {
      allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
      cached_methods   = ["GET", "HEAD"]
      target_origin_id = "origin-bucket-${aws_s3_bucket.site.id}"

      forwarded_values {
        query_string = "true"

        cookies {
          forward = "none"
        }
      }

      viewer_protocol_policy = "redirect-to-https"
      compress               = true
      min_ttl                = 0
      default_ttl            = 300
      max_ttl                = 1200
    }

    # Cache behavior with precedence 0
    ordered_cache_behavior {
      path_pattern     = "/index.html"
      allowed_methods = ["GET", "HEAD", "DELETE", "OPTIONS", "PATCH", "POST", "PUT"]
      cached_methods   = ["GET", "HEAD", "OPTIONS"]
      target_origin_id = "origin-bucket-${aws_s3_bucket.site.id}"

      forwarded_values {
        query_string = "true"

        cookies {
          forward = "none"
        }
      }

      min_ttl                = 0
      default_ttl            = 0
      max_ttl                = 0
      compress               = true
      viewer_protocol_policy = "redirect-to-https"
    }

    custom_error_response {
      error_code = "404"
      response_code      = "200"
      response_page_path = "/index.html"
    }
    
    custom_error_response {
      error_code = "403"
      response_code      = "200"
      response_page_path = "/index.html"
    }

    price_class = "PriceClass_100" # https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PriceClass.html

    restrictions {
      geo_restriction {
        restriction_type = "none"
      }
    }

    viewer_certificate {
      acm_certificate_arn      = module.cert.arn
      ssl_support_method       = "sni-only"
      minimum_protocol_version = "TLSv1"
    }

    lifecycle {
      ignore_changes = [tags]
    }

    tags = {
      Environment = var.env_tags
      Created_with = "Terraform"
    }
  }
  ```
## Finally the `.tfvars` file
- Creating a `.tfvar` file allows you to deploy this applications to multiple environments (dev|statging|prod)
  ```hcl
  # (./env_configs/prod.tfvars)
  domain_name      = "myawesomesite.com"
  hosted_zone_name = "myawesomesite.com"
  env_tags          = "Production"
  ```
- Now running this
  ```shell
  # *NOTE* run these commands in the terraform folder

  export AWS_PROFILE="<YOUR_AWS_PROFILE_HERE>"
  CLIENT_BUCKET_NAME="<YOUR_AWS_S3_BUCKET_NAME>"
  TERRAFORM_STATE_BUCKET_NAME="<YOUR_TF_REMOTE_STATE_BUCKET_NAME>"

  # Environment variables
  WORKSPACE="prod"
  VAR_FILE="./env/prod.tfvars"

  # TF version
  tf_ver="v0.13.5"; if [[ ! $(Terraform --version) =~ "Terraform $tf_ver" ]]; then echo "Terraform $tf_ver is required"; exit 1; fi

  # Cleanup .terraform
  rm -rf .terraform/

  # Deploy terraform
  echo "[Running] terraform"
  terraform init -backend-config bucket="${TERRAFORM_STATE_BUCKET_NAME}"

  # If the workspace does not exist, create it.
  if ! terraform workspace select ${WORKSPACE}; then terraform workspace new ${WORKSPACE}; fi
  terraform apply -auto-approve -var-file=$VAR_FILE

  cd .. # where the package.json file exist

  # Build the static files
  echo "[Build] production version of the website]"
  yarn
  yarn run build

  # Upload the source code to AWS S3
  echo "[Upload] website content"
  aws s3 rm s3://$CLIENT_BUCKET_NAME/  --recursive
  aws s3 sync dist/ s3://$CLIENT_BUCKET_NAME/ --exclude \"*.DS_Store*\"
  aws s3 cp dist/index.html s3://$CLIENT_BUCKET_NAME/ --cache-control max-age=0
  ```









# AWS CDK (AWS Cloud Development Kit)
- The AWS CDK (Amazon Web Services Cloud Development Kit) is a [new open source framework](https://github.com/aws/aws-cdk) to define cloud infrastructure in code (Infrastructure as Code) and provisioning it through AWS CloudFormation.
- CDK provides many high level components to allow rapid code development requiring much less input compared to the typical CloudFormation templates. 
- CDK is available in TypeScript, Python, Java and C#.
  ```shell
  # Install globally 
  $ npm i -g aws-cdk

  $ mkdir my-app && cd my-app
  $ cdk init app --language=typescript

  $ npm i @aws-cdk/aws-apigatewayv2 @aws-cdk/aws-apigatewayv2-integrations @aws-cdk/aws-ec2 @aws-cdk/aws-lambda @aws-cdk/aws-rds @aws-cdk/core source-map-support
  ```









# PostGIS
- [](https://www.martinpeters.ie/2020/02/01/cdk-rds-postgis-setup/)




# AWS SAM (AWS Serverless Application Model)
- SAM is an open-source framework for building serverless applications. 
- You define the services you want in YAML and during the deployment SAM will convert it to CloudFormation syntax
- SAM can be installed with `Homebrew`
- SAM allows you to run your application locally so you can test it out and debug
- SAM is Infrastructure as Code

## Installing SAM on MacOS
- [How to install SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-mac.html)
  ```shell
  $ brew tap aws/tap
  $ brew install aws-sam-cli
  $ sam --version

  $ brew upgrade aws-sam-cli
  ```

## Get setup
- Start by scaffolding your application
  ```shell
  # Step 1 - Download a sample application
  $ sam init
  # 1 - AWS Quick Start Templates
  # 1 - Zip (artifact is a zip uploaded to S3)
  # 1 - nodejs14.x
  # AWS quick start application templates:
  #    1 - Hello World Example
  #    2 - Step Functions Sample App (Stock Trader)
  #    3 - Quick Start: From Scratch
  #    4 - Quick Start: Scheduled Events
  #    5 - Quick Start: S3
  #    6 - Quick Start: SNS
  #    7 - Quick Start: SQS
  #    8 - Quick Start: Web Backend

  # Step 2 run your code locally
  $ sam local start-api

  # Step 3 - Build your application
  $ cd sam-app
  $ sam build

  # Step 4 - Deploy your application
  $ sam deploy --guided
  # Once everything is deployed it will print out the REST Endpoint `https://<RANDOM_STRING>.execute-api.us-west-2.amazonaws.com/Prod/`
  ```

## Check your stuff out in AWS Console
- You can view your SAM application in AWS Console by going to `Lambda` > `Applications`
  ![aws-console_serverless-application](/assets/blog/aws/aws-console_serverless-application.png)
- You can view your stack my clicking the `CloudFormation`


## Check your stuff within VSCode with the `Serverless Console` extension
- You can use a vscode extension [Serverless Console](https://marketplace.visualstudio.com/items?itemName=devAdvice.serverlessconsole) to view all the logs
  - In vscode click the lighting bolt in the quick look panel
  - Create a connection

   ![serverless-console_connect](/assets/blog/aws/serverless-console_connect.png)

   ![serverless-console_panel](/assets/blog/aws/serverless-console_panel.png)

- Invoke your Lambda function directly 
  ```shell
  $ sam local invoke "HelloWorldFunction" -e events/event.json
  ```

## Cleanup
- To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

  ```shell
  aws cloudformation delete-stack --stack-name <STACK_NAME>
  ```