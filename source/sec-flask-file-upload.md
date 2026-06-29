# File Upload

    <p>You can handle uploaded files with Flask easily.  Just make sure not to
                forget to set the <c>enctype="multipart/form-data"</c> attribute on your HTML
                form, otherwise the browser will not transmit your files at all.</p>
    <p>Uploaded files are stored in memory or at a temporary location on the
                filesystem.  You can access those files by looking at the
                <c classes="xref py py-attr">files</c> attribute on the request object.  Each
                uploaded file is stored in that dictionary.  It behaves just like a
                standard Python <c classes="xref py py-class">file</c> object, but it also has a
                <c classes="xref py py-meth">save()</c> method that
                allows you to store that file on the filesystem of the server.
                Here is a simple example showing how that works:</p>
```python
from flask import request

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['the_file']
        f.save('/var/www/uploads/uploaded_file.txt')

```
    <p>If you want to know how the file was named on the client before it was
                uploaded to your application, you can access the
                <c classes="xref py py-attr">filename</c> attribute.
                However please keep in mind that this value can be forged
                so never ever trust that value.  If you want to use the filename
                of the client to store the file on the server, pass it through the
                <c classes="xref py py-func">secure_filename()</c> function that
                Werkzeug provides for you:</p>
```python
from werkzeug.utils import secure_filename

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['the_file']
        f.save('/var/www/uploads/' + secure_filename(f.filename))
```

    <p>For some better examples, checkout the <inline classes="xref std std-ref">uploading-files</inline> pattern.</p>