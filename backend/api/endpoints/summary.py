from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
import os
import boto3
from schemas import summary
import time
from openai import OpenAI
from sqlalchemy.exc import IntegrityError
from moviepy import editor as mp
from db.database import get_db
from models import SummaryModel
from sqlalchemy.orm import Session, Query
import requests


OpenAI.api_key = 'sk-proj-Q3Em8tl42Ds1GkUPFI3nT3BlbkFJjeoEbGc0fTlSCTRp5KXk'
os.environ['OPENAI_API_KEY'] = 'sk-proj-Q3Em8tl42Ds1GkUPFI3nT3BlbkFJjeoEbGc0fTlSCTRp5KXk'
client = OpenAI()
headers = {'X-Api-Key': 'r4x5F8y97lo8UjOGQEBLgQ==R8XwEAYA0hAo1kAt'}

router = APIRouter()

@router.get("/summary")
def get_summary(
    courseId: str = None,
    db: Session = Depends(get_db)
):  
    """
    API endpoint to get all lectures.
    Params:
    """
    query: Query = db.query(SummaryModel)
    if courseId is None:
        return {"error": "pass courseId as the param"}
    query = query.filter(SummaryModel.courseId == courseId) 
    lectures = query.all()
    return lectures

@router.post("/addSummary")
def add_summary(
    body: summary.CreateSummary,
    db: Session = Depends(get_db)
):  
    """
    API endpoint to dump summary to DB.
    """
    exists_summary = db.query(SummaryModel).filter(SummaryModel.id == body.id).first()
    if exists_summary:
        raise HTTPException(status_code=400, detail="Summary with the same id already exists")

    try:
        new_summary = SummaryModel(**body.dict())
        db.add(new_summary)
        db.commit()
        db.refresh(new_summary)
        return "Success"
    except IntegrityError:
        raise HTTPException(status_code=500, detail="Failed to add Summary due to database integrity error")

###########################

@router.get("/downloadFileFromS3")
def getFileFromS3():
    s3 = boto3.client('s3', aws_access_key_id="AKIA3FO4UZ66TYQMK6NB" , aws_secret_access_key="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")
    s3.download_file('intellitool-bucket', 'audiotestfile.mp3', 'download') 


def convertVideoToMp3(file_name):
    try:
        clip = mp.VideoFileClip(file_name)
        clip.audio.write_audiofile("../../converted_video.mp3")
    except Exception as e:
        print(f"Caught exception while converting video tp Mp3: {e}")


def extractTextFromVideo():
    try:
        audio_file = open("converted_video.mp3", "rb")
        transcript = client.audio.transcriptions.create(
        model="whisper-1", 
        file=audio_file
        )
        print(transcript.text)   
    except Exception as e:
        print(f"Caught exception while extracting text from video: {e}")


def getTextFromImage(fileName):
    print("Getting text from Image")
    api_url = 'https://api.api-ninjas.com/v1/imagetotext'
    image_file_descriptor = open(fileName, 'rb')
    files = {'image': image_file_descriptor}
    r = requests.post(api_url, files=files, headers=headers)
    print(r.json())
 

def uploadFileToS3(file_name, bucket, object_name=None):
    if object_name is None:
        object_name = os.path.basename(file_name)

    noException = True

    s3 = boto3.client('s3', aws_access_key_id="AKIA3FO4UZ66TYQMK6NB" , aws_secret_access_key="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")
    try:
        response = s3.upload_file(file_name, bucket, object_name)
        print(f"Got this repsonse from S3: {response} ")
    except Exception as e:
        print(f"Caught exception while uploading file to S3: {e}" )
    return noException

@router.post("/uploadFile")
async def uploadFile(upload_file:UploadFile =File(...)):
    print("Hello Devansh")

    if '.jpg' in upload_file.filename or '.jpeg' in upload_file.filename or '.png' in upload_file.filename or '.pdf' in upload_file.filename or '.mp3' in upload_file.filename or '.mp4' in upload_file.filename:
        file_save_path="./uploads/"+upload_file.filename
        if os.path.exists("./uploads") == False:
            os.makedirs("./uploads")

        with open(file_save_path, "wb") as f:
            f.write(upload_file.file.read())
 
        if uploadFileToS3(file_name=file_save_path, bucket='intellitool-bucket'):
            return "File uploaded to S3 server successfully"
        else:
            return "File couldn't be uploaded to S3. Please try again"
    else:
        return {"error": "File Type is not valid please upload only jpg,jpeg, png, pdf, mp3 and .mp4 only"}