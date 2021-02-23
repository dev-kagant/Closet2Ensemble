from flask import Blueprint, request
import os
import boto3
from botocore.exceptions import ClientError
import uuid
import logging

upload_routes = Blueprint('upload', __name__)

# s3 = boto3.client('s3',
#                 aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
#                 aws_secret_access_key=os.environ.get(
#                     'AWS_SECRET_ACCESS_KEY_ID'))

s3 = boto3.resource('s3',
                aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
                aws_secret_access_key=os.environ.get(
                    'AWS_SECRET_ACCESS_KEY_ID'))

# Buckets = s3.list_buckets()

# # Output the bucket names
# print('Existing buckets:')
# for bucket in Buckets['Buckets']:
#     print(f'  {bucket["Name"]}')

BUCKET_NAME = os.environ.get('BUCKET_NAME')

# @upload_routes.route('/upload', methods=['POST'])
# def upload():
#     if request.method == 'POST':
#         img = request.files['filetype']
#         if img:
#             filename = secure_filename(img.filename)
#             img.save(filename)
#             s3.upload_file(
#                 Bucket = BUCKET_NAME,
#                 Filename=filename,
#                 Key=filename
#             )
#             msg = "Upload Done !"
#     return render_template("file_upload_to_s3.html", msg = msg)

@upload_routes.route('', methods=['POST'])
def upload_file(data=None, BUCKET_NAME=BUCKET_NAME, object_name=None):
    print("IMAGE COMING SOON HERE")
    # data = request
    print("ROUND THREE", request.files)
    if object_name is None:
        object_name = uuid.uuid4().hex
    try:
        # image = data['file']
        print("IMAGE HERE")
        response = s3.Bucket(BUCKET_NAME).upload_file(data, object_name)
        print("MAYBE IMAGE NOW", response)
    except ClientError as e:
        logging.error(e)
        return False
    return {'img_url': f'https://closettoensemble.s3.amazonaws.com/{object_name}'}
