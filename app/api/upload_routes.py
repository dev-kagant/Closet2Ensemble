from flask import Blueprint, request
import os
import boto3
from botocore.exceptions import ClientError
import uuid
import logging

upload_routes = Blueprint('upload', __name__)

s3 = boto3.client('s3',
                aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
                aws_secret_access_key=os.environ.get(
                    'AWS_SECRET_ACCESS_KEY_ID'))

Buckets = s3.list_buckets()

# Output the bucket names
print('Existing buckets:')
for bucket in Buckets['Buckets']:
    print(f'  {bucket["Name"]}')

BUCKET_NAME = os.environ.get('BUCKET_NAME')

@upload_routes.route('/', methods=['POST'])
def upload_file(data=None, BUCKET_NAME=BUCKET_NAME, object_name=None):
    print("IMAGING", request.files)
    data = request.files['image']
    if object_name is None:
        object_name = uuid.uuid4().hex
    try:
        response = s3.upload_fileobj(data, BUCKET_NAME, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return {'img_url': f'https://closettoensemble.s3.amazonaws.com/{object_name}'}
