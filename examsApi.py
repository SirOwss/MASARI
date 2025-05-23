from flask import Flask, request, send_file, Response
from examsCore import examsScheduling  # Your function
import io
from flask_cors import CORS
from http import HTTPStatus

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

@app.route('/generate-docx', methods=['POST'])
def generate_docx():
    try:
        # Check if files are provided
        if 'universityExamFile' not in request.files or 'courseDataFile' not in request.files:
            return Response("Missing universityExamFile or courseDataFile", 
                           status=HTTPStatus.BAD_REQUEST, mimetype='text/plain')

        file1 = request.files['universityExamFile']
        file2 = request.files['courseDataFile']

        # Validate file types
        if not (file1.filename.endswith('.pdf') and file2.filename.endswith('.pdf')):
            return Response("Both files must be PDFs", 
                           status=HTTPStatus.BAD_REQUEST, mimetype='text/plain')

        # Convert uploaded files to BytesIO
        file1_bytesio = io.BytesIO(file1.read())
        file2_bytesio = io.BytesIO(file2.read())

        # Generate DOCX
        docx_buffer = examsScheduling(file1_bytesio, file2_bytesio)

        # Return the file for download
        return send_file(
            docx_buffer,
            download_name='exam_schedule.docx',
            as_attachment=True,
            mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )

    except Exception as e:
        return Response(f"Error generating DOCX: {str(e)}", 
                       status=HTTPStatus.INTERNAL_SERVER_ERROR, mimetype='text/plain')

if __name__ == '__main__':
    app.run(debug=True, port=5000)