# CI/CD Pipeline for MarkDock Application
This document outlines the steps to set up the CI/CD pipeline for the MarkDock application using GitHub Actions.

## What do we need?
1. A GitHub repository
2. An AWS account
3. An IAM user with permissions to deploy to the S3 bucket and invalidate the CloudFront distribution

## Steps
Inside your GitHub repository you will need to setup some secrets so that the workflow can know where to deploy the application.

The following secrets need to be set up in the repository settings:
1. `AWS_ACCESS_KEY_ID` - The access key ID of the IAM user
2. `AWS_SECRET_ACCESS_KEY` - The secret access key of the IAM user
3. `AWS_REGION` - The region of the S3 bucket
4. `AWS_S3_BUCKET` - The name of the S3 bucket
5. `AWS_CLOUDFRONT_DISTRIBUTION_ID` - The ID of the CloudFront distribution

You can find these inside the AWS console. For creating the IAM user, you can use the IAM section of AWS and create a user with permission for creating and managing S3 buckets and CloudFront distributions.

## Explanation of the deployment workflow

The workflow is defined in the `.github/workflows/deploy.yml` file. This file contains the steps that are executed when a push is made to the repository.

1. The workflow is triggered on a push to the `main` branch.
2. The workflow checks out the code from the repository.
3. The workflow installs the dependencies using `npm ci`. (npm ci is used to install the dependencies from the `package-lock.json` file)
4. The workflow builds the application using `npm run build`.
5. The workflow deploys the application to the S3 bucket.
6. The workflow invalidates the CloudFront distribution cache so that the changes are reflected immediately.

## Explanation of the testing workflow

The workflow is defined in the `.github/workflows/testing.yml` file. This file is used for running the tests on the application. Its used to ensure that the application is working as expected before deploying it.

1. The workflow is triggered on a push to the `main` branch or a pull request to the `main` branch.
2. The workflow checks out the code from the repository.
3. The workflow installs the dependencies using `npm ci`. (npm ci is used to install the dependencies from the `package-lock.json` file)
4. The workflow runs the tests using `npm run test`.
5. The workflow will pass if the tests are successful and fail if the tests fail.




