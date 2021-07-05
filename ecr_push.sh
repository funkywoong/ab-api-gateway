#/bin/bash
while getopts n:v: flag
do
    case "${flag}" in
        v) img_version=${OPTARG};;
	n) img_name=${OPTARG};;
    esac
done

aws ecr get-login-password --region us-east-1 | aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 353380520333.dkr.ecr.us-east-1.amazonaws.com
docker build -t $img_name:v$img_version .
docker tag $img_name:v$img_version 353380520333.dkr.ecr.us-east-1.amazonaws.com/$img_name:v$img_version
docker push 353380520333.dkr.ecr.us-east-1.amazonaws.com/$img_name:v$img_version