# Documentation For AWS Setup and Deployment
This document outlines the steps to set up the infrastructure for the MarkDock application on AWS.

## What do we need?
1. An AWS account
2. A domain name
3. S3 bucket for storing the static files
4. CloudFront distribution for serving the static files

## AWS Account
If you don't have an AWS account, you will need to create one. You can create an account [here](https://aws.amazon.com/).

## Domain Name
You will need a domain name to point to the CloudFront distribution. You can purchase a domain name from any domain registrar.

## S3 Bucket
1. Go to the S3 service in the AWS console.
2. Click on the `Create bucket` button.
3. Enter a unique bucket name and select the region.
4. You will need to enable static website hosting for the bucket. To do this, go to the bucket properties and click on the `Static website hosting` tab. Enable the static website hosting and enter the index document and error document.
Since we are using React Router, the index document should be `index.html` and the error document should be `index.html`.
5. Keep the public access settings to be on. This will allow the CloudFront distribution to access the files in the bucket.
6. Create the bucket with the above settings.
7. You will want to upload the build files to the bucket. You will need to upload the files and then click upload folder and select the static folder from the build folder.

## CloudFront Distribution
1. Go to the CloudFront service in the AWS console.
2. Click on the `Create distribution` button.
3. You will want to copy the endpoint of the S3 bucket that you created earlier. This will be the origin domain name.
4. Paste the origin domain name in the `Origin Domain` field.
5. Under Viewer, you can select the `Redirect HTTP to HTTPS` option.
6. Select the recommended cache policy for the distribution.
7. Under Settings, you can enter the domain name that you want to use for the CloudFront distribution. This should be the domain name that you purchased earlier.
8. You will also want to set up a certificate using ACM. You can request a certificate from ACM and then select the certificate for the CloudFront distribution.
9. Create the distribution with the above settings.

## Configuring the Domain Name
You will need to configure the domain name to point to the CloudFront distribution. You will need to create a CNAME record in your domain registrar's DNS settings. The CNAME record should point to the domain name of the CloudFront distribution.

Here is an example of how the CNAME record should look:
```
Name: www.markdock.com
Type: CNAME
Value: d123456789.cloudfront.net
```

For the root domain (markdock.com), you will need to create a redirect to the www subdomain. This can be done using the domain registrar's settings.

## Conclusion
Once you have completed the above steps, you should have the infrastructure set up for the MarkDock application on AWS. You can now access the application using the domain name that you configured.

If you want to setup the workflow for deploying the application directly to the S3 bucket on Github, you can follow our documentation [here](./ci-cd.md).
