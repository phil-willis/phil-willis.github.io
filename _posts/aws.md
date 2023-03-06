---
title: 'aws'
excerpt: ''
coverImage: '/assets/covers/aws.jpg'
ogImage:
  url: '/assets/covers/aws.jpg'
---





<details>
<summary>AWS CLI</summary>

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
- You can access your AWS services via ([more on profiles here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)):
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
    - List profiles
      ```shell
      $ aws configure list-profiles
      $ aws configure list
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
    ![Security Page](/assets/blog/aws/credentials_1.jpg)
  2. Click the `Access keys (access key ID and secret access key)` accordion title and click `Create New Access Key`
    ![Security Page](/assets/blog/aws/credentials_2.jpg)
  3. Click `Show Access Key` to have it displayed on the screen. Note, that you can download it to your machine as a file and open it whenever needed. To download it, just click the `Download Key File` button.
    ![Security Page](/assets/blog/aws/credentials_2.jpg)
  4. Now update your `~/.aws/credentials` file with this key pair
    ```shell
    [default]
    aws_access_key_id=AAAAAAAAAAAAAEXAMPLE
    aws_secret_access_key=123456789123456789
    ```

</details>





<details>
<summary>S3</summary>
- AWS Lambda provides various ways to access secrets or sensitive data securely. Here are a few of the most common methods:

  1. `AWS Systems Manager Parameter Store`: This is a managed service that lets you store and retrieve secrets, such as database credentials and API keys. You can access the secrets in a Lambda function by using the AWS Systems Manager API, AWS CLI, or SDK.

  2. `AWS Secrets Manager`: This is a fully managed service that enables you to store, rotate, and retrieve secrets securely. You can access the secrets in a Lambda function by using the AWS Secrets Manager API, AWS CLI, or SDK.

  3. `Environment Variables`: You can store secrets as environment variables in a Lambda function. These secrets are encrypted and protected by the Lambda service-linked role.

  4. `IAM Role`: You can assign an IAM role to a Lambda function that has permissions to access the secrets. For example, you can assign a role that has read-only access to the secrets stored in AWS Secrets Manager or the AWS Systems Manager Parameter Store.

- Regardless of the method you choose, it's important to ensure that the secrets are stored securely and protected from unauthorized access. You should also consider rotating the secrets on a regular basis and limiting the permissions of the roles and services that access the secrets.



</details>




<details>
<summary>IAM</summary>

# IAM (Identity and Access Management)
- `AWS IAM` is a web service that helps you securely control access to AWS resources. IAM enables you to manage users, groups, and permissions to AWS resources. With IAM, you can create and manage AWS users and groups, and use permissions to allow and deny access to AWS resources.
- An `AWS policy `is a document that defines one or more permissions. AWS policies are written in JSON and specify the actions that a user, group, or role is allowed or denied to perform on AWS resources. For example, you can create a policy that allows a user to perform only read operations on Amazon S3 buckets, or a policy that allows a group to launch EC2 instances.
- Policies can be attached to AWS users, groups, or roles. When a policy is attached to a user, it defines what that user can do in the AWS environment. When a policy is attached to a group, it defines the permissions for all users in that group. When a policy is attached to a role, it defines the permissions for applications or services that assume the role.
- AWS provides a number of managed policies that you can use as building blocks for your policies. For example, the AmazonS3ReadOnlyAccess policy provides read-only access to Amazon S3 buckets. You can also create custom policies, either by creating a new policy from scratch or by modifying an existing policy.
- Here's an example of a simple AWS policy to allow read access to an Amazon S3 bucket:
  ```json
  {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Action": [
                  "s3:GetObject",
                  "s3:ListBucket"
              ],
              "Resource": [
                  "arn:aws:s3:::<YOUR_BUCKET_NAME>",
                  "arn:aws:s3:::<YOUR_BUCKET_NAME>/*"
              ]
          }
      ]
  }
  ```
- This policy uses the "Effect" of "Allow" to specify that the policy allows read access to the S3 bucket. The "Action" section lists the specific S3 actions that are allowed (s3:GetObject and s3:ListBucket), and the "Resource" section specifies the ARN (Amazon Resource Name) of the S3 bucket and its contents (<YOUR_BUCKET_NAME> and <YOUR_BUCKET_NAME>/*).
- Note that in the <YOUR_BUCKET_NAME> placeholder in the ARN, you would replace it with the actual name of the S3 bucket you want to grant read access to.
- You can attach this policy to an IAM user, group, or role to grant read access to the specified S3 bucket.






</details>









<details>
<summary>S3</summary>

# S3
- Storage
</details>







<details>
<summary>CloudWatch</summary>

# CloudWatch
- CloudWatch enables you to monitor your complete stack (applications, infrastructure, network, and services) and use alarms, logs, and events data to take automated actions and reduce mean time to resolution (MTTR). This frees up important resources and allows you to focus on building applications and business value.
- You can create Dashboards, Alarms, or just query the logs
## Logs
- You have 2 options: `Log Goups` or `Log Insights`
- `Log Insights` is better
- Select a log group(s) then run a query
  ```
  fields @timestamp, @message, @logStream, @log
  | sort @timestamp desc
  | limit 20
  ```
- Allowed filtering options are:
  ```html
  'in', 'and', 'or', 'not', 'like', '=~', '~=', '|', '|>', '^', '*', '/', '%', '+', '-', '<', '>', '<=', '>=', '=', '!='
  ```
- You can also regex console.log event you've done in your Lambdas like:
  ```
  fields @timestamp, @message, @logStream, @log
  | sort @timestamp desc
  | filter @message like /????/
  | limit 20
  ```
- Learn more about queries [here](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax-examples.html)
</details>








<details>
<summary>CLoudFront</summary>

# CLoudFront
- Distribute your static content at AWS edge locations
</details>








<details>
<summary>ACM</summary>

# ACM
- AWS Certificate Manager is a service provided by Amazon that issues on-demand TLS certificates at no cost. Much like Let’s Encrypt, Amazon controls the Certificate Authority (Amazon Trust Services, LLC) behind the certificates, as well as the accompanying API to manage them.
- Amazon Certificate Manager (ACM) provides an elegant wayt to convert  a cumbersome multi-step process (the process of provisioning, validating, and configuring Transport Layer Security (TLS) certificates) into a single step
- ACM certificates can only be associated with AWS Elastic and Application Load Balancers, CloudFront distributions, and API Gateway endpoints.
- 2 kinds of certs: `Amazon Issued` & `Imported`


# Downloading a cert from a CA
- More AWS cert [info](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains-prerequisites.html)
- Steps from your CA:
  1. Download the certs from a CA
  2. Create cert key/body/chain
    ```shell
    #  Create the out folder
    if [ ! -d out ]; then
      mkdir -p out;
    fi
    openssl rsa -in example.com.pem -out out/cert_key.pem -passin pass:"password-used-to-download-crt"
    openssl x509 -in example.com.pem -out out/cert_body.pam  -passin pass:"password-used-to-download-crt"
    openssl pkcs12 -in example.com.pfx -cacerts -nokeys  -passin pass:"password-used-to-download-crt" | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > out/cert-chain.crt
    ```

# Import a Cert into AWS ACM
- You want to make sure that you are in the Virginia region, [here](https://us-east-1.console.aws.amazon.com/acm/home?region=us-east-1#/certificates/list)
- Client the `Import`
  - To import a self–signed SSL/TLS certificate into ACM, you must provide the certificate and its private key. 
  - To import a certificate signed by a certificate authority (CA), you must also include the certificate chain. 
  - Your certificate must satisfy the following criteria:
    - Certificate body,  ...starts with  `-----BEGIN CERTIFICATE-----`
    - Certificate private key, ...starts with `-----BEGIN RSA PRIVATE KEY-----`
    - Certificate chain - if cert is from a CA you need this, if self-signed you don't. 



</details>










<details>
<summary>Route53</summary>

# Route53
- Route end users to your site reliably with globally-dispersed Domain Name System (DNS) servers and automatic scaling.
</details>








<details>
<summary>API Gateway</summary>

# API Gateway
- Allows you to make RESTful applications
- There's 4 types of API Gateway offering:
  - [HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)
  - [REST API](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html)
  - REST API (private)
  - WebSocket API

- `REST APIs `support more features than `HTTP APIs`, while `HTTP APIs` are designed with minimal features so that they can be offered at a lower price. You can read more [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html)
- When you add a new endpoint you have to create a `resource` then add the http `methods` you want

## Custom Authorizer
- [Here's a great writeup on Lambda Custom Authorizers](https://www.alexdebrie.com/posts/lambda-custom-authorizers/)
- API Gateway provides an HTTP API endpoint that is fully configurable. You define the HTTP resources (like /user), the HTTP methods on that resources (like POST, GET, DELETE, …) and the integration (e.g. Lambda function) that should be called to process the request. A Lambda function can then run whatever logic is needed to answer the request. The Lambda function returns its result to the API Gateway. The API Gateway responds to the caller. The following figure demonstrates this flow.
  ![api-gateway-flow](/assets/blog/aws/api-gateway-flow.jpg)  

- You could include the authentication and authorization logic into the Lambda function that handles the request. But you can also separate concerns, make use of API Gateway caching mechanism, and go for Custom Authorization. API Gateway will invoke another Lambda function (Auth Lambda Function) for the first request and caches that result for a configurable duration. Caching will reduce the overhead (latency and DynamoDB charges) for authentication and authorization to a minimum.
  ![api-gateway-flow_custom-authorizer](/assets/blog/aws/api-gateway-flow_custom-authorizer.jpg)
- You can use whatever logic you like to decide if a request is allowed or not. Here I will implement an API token mechanism. All HTTP requests from clients must pass an Authorization: xyz header. The Auth Lambda Function will take this token to query a DynamoDB table. The request is allowed or denied depending on if the query matches.

- The code for the Auth Lambda Function is responsible for looking up the token. The Authorization HTTP header field is used to transmit the token. You can use Node.js and the AWS SDK for JavaScript to implement this logic. API Gateway will pass an event to our function like this:
  ```json
  {
    "type":"TOKEN",
    "authorizationToken":"<caller-supplied-token>",
    "methodArn":"arn:aws:execute-api:<regionId>:<accountId>:<apiId>/<stage>/<method>/<resourcePath>"
  }
  ```
- API Gateway expects that we respond in the following way:
  ```json
  {
    "principalId": "xyz",
    "policyDocument": {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "execute-api:Invoke",
          "Effect": "Allow", // or Deny
          "Resource": "arn:aws:execute-api:<regionId>:<accountId>:<apiId>/<stage>/<method>/<resourcePath>"
        }
      ]
    }
  }
  ```
- A simple implementation looks like this:
  ```js
  var AWS = require('aws-sdk');
  var dynamodb = new AWS.DynamoDB();

  function generatePolicy(principalId, effect, resource) {
    return {
      'principalId': principalId,
      'policyDocument': {
        'Version': '2012-10-17',
        'Statement': [{
          'Action': 'execute-api:Invoke',
          'Effect': effect,
          'Resource': resource
        }]
      }
    };
  }

  exports.handler = function(event, context, cb) {
    var token = event.authorizationToken;
    dynamodb.getItem({
      "Key": {
        "token": {"S": token}
      },
      "TableName": "auth-token"
    }, function(err, data) {
      if (err) {
        cb(err);
      } else {
        if (data.Item === undefined) {
          cb(null, generatePolicy('user', 'Deny', event.methodArn));
        } else {
          cb(null, generatePolicy('user', 'Allow', event.methodArn));
        }
      }
    });
  };
  ``` 
- More on Lambda authorizer [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html)
</details>








<details>
<summary>Lambda</summary>

# Lambda
- Serverless functions
</details>













<details>
<summary>DynamoDB</summary>

# DynamoDB
- DynamoDB is a NoSQL database service
</details>








<details>
<summary>RDS</summary>

# RDS
- Relational Database Service (RDS)

# PostGIS
- [](https://www.martinpeters.ie/2020/02/01/cdk-rds-postgis-setup/)
</details>










<details>
<summary>Aurora DB</summary>

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
</details>











<details>
<summary>AWS - Elastic Container Registry (ECR) </summary>

# ECR
- ECR is your own Docker repository where you can push images up to your AWS account
- Lets create a simple registry and add a docker container
</details>



<details>
<summary>AWS - Elastic Container Service (ECS)</summary>

# ECS
- ECS is a fully managed container orchestration service. AWS ECS is a fantastic service for running your containers. 
- Run highly secure, reliable, and scalable containers
- ECS is a container service that handles the orchestration and provisioning of Docker containers. 


- `Task Definition` — This a blueprint that describes how a docker container should launch. If you are already familiar with AWS, it is like a LaunchConfig except instead it is for a docker container instead of a instance. It contains settings like exposed port, docker image, cpu shares, memory requirement, command to run and environmental variables.
- `Task` — This is a running container with the settings defined in the Task Definition. It can be thought of as an “instance” of a Task Definition.
- `Service` — Defines long running tasks of the same Task Definition. This can be 1 running container or multiple running containers all using the same Task Definition.
- `Cluster` — A logic group of EC2 instances. When an instance launches the ecs-agent software on the server registers the instance to an ECS Cluster. This is easily configurable by setting the ECS_CLUSTER variable in /etc/ecs/ecs.config described here.
- `Container Instance` — This is just an EC2 instance that is part of an ECS Cluster and has docker and the ecs-agent running on it.


<!-- https://medium.com/boltops/gentle-introduction-to-how-aws-ecs-works-with-example-tutorial-cea3d27ce63d -->

</details>

























<details>
<summary>AWS CDK (AWS Cloud Development Kit)</summary>

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
</details>



















<details>
<summary>AWS SAM (AWS Serverless Application Model)</summary>

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
</details>
