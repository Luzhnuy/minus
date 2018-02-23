var formChecker = null;
function swfUploadLoaded() {
	var btnSubmit = document.getElementById("btnSubmit");
    var tfield = document.createElement("span");
    var btn = document.getElementById("SWFUpload_0");
    btn.parentNode.insertBefore(tfield, btn);
    tfield.innerHTML = '<input type="text" id="txtFileName" disabled="true" style="border: solid 1px; background-color: #FFFFFF;" />';
	btnSubmit.onclick = doSubmit;
	btnSubmit.disabled = false;
};


// Called by the submit button to start the upload
function prepare_post_data()
{

    var form = document.getElementById("minus_upload");
    for(i=0; i<form.elements.length; i++)
    {
        var element = form.elements[i];
        var value = element.value;
        if (element.type == "checkbox" )
        {
            if (!element.checked) continue;
        }
        else if (element.type == "select-multiple")
        {
            value = [];
            for (o=0; o<element.options.length;o++)
            {
                if (element.options[o].selected)
                {
                    value.push(element.options[o].value)

                }
            }
        }

        swfu.addPostParam(element.name, value);
    }
}

function fileDialogStart() {
	var txtFileName = document.getElementById("txtFileName");
	txtFileName.value = "";

	this.cancelUpload();
}

function doSubmit(e) {
	
	e = e || window.event;
	if (e.stopPropagation) {
		e.stopPropagation();
	}
	e.cancelBubble = true;
    prepare_post_data();
    swfu.startUpload();
	return false;
}

function fileQueued(file) {
	try {
		var progress = new FileProgress(file, this.customSettings.progress_target);
		progress.setStatus("Чекає...");
		progress.toggleCancel(true, this);

	} catch (ex) {
		this.debug(ex);
	}

}


function SinglefileQueued(file) {
	try {
		var txtFileName = document.getElementById("txtFileName");
		txtFileName.value = file.name;
	} catch (e) {
	}
}


function fileQueueError(file, errorCode, message) {
	try {
		if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
			alert("Надто багато файлів. Виберіть будь-ласка один.");
			return;
		}

		var progress = new FileProgress(file, this.customSettings.progress_target);
		progress.setError();
		progress.toggleCancel(false);

		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			progress.setStatus("Файл надто великий.");
			this.debug("Error Code: File too big, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			progress.setStatus("Нульовий розмір файла.");
			this.debug("Error Code: Zero byte file, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
			progress.setStatus("Неправильний тип файла.");
			this.debug("Error Code: Invalid File Type, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		default:
			if (file !== null) {
				progress.setStatus("Unhandled Error");
			}
			this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}


function fileDialogCompleteDummy(numFilesSelected, numFilesQueued) {
	return false;
}


function fileDialogComplete(numFilesSelected, numFilesQueued) {
	try {
		if (numFilesSelected > 0) {
			document.getElementById(this.customSettings.cancelButtonId).disabled = false;
		}
		
		/* I want auto start the upload and I can do that here */
		this.startUpload();
	} catch (ex)  {
        this.debug(ex);
	}
}

function uploadStart(file) {
	try {
		/* I don't want to do any file validation or anything,  I'll just update the UI and
		return true to indicate that the upload should start.
		It's important to update the UI here because in Linux no uploadProgress events are called. The best
		we can do is say we are uploading.
		 */
		var progress = new FileProgress(file, this.customSettings.progress_target);
		progress.setStatus("Завантажується...");
		progress.toggleCancel(true, this);
	}
	catch (ex) {}
	
	return true;
}

function uploadProgress(file, bytesLoaded, bytesTotal) {
	try {
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);

        if (this.settings.file_queue_limit == 1)	{file.id = "singlefile"};	
        // This makes it so FileProgress only makes a single UI element, instead of one for each file
		var progress = new FileProgress(file, this.customSettings.progress_target);
		progress.setProgress(percent);
		progress.setStatus("Завантажується...");
	} catch (ex) {
		this.debug(ex);
	}
}



function singleUploadSuccess(file, serverData) {
		file.id = "singlefile";	// This makes it so FileProgress only makes a single UI element, instead of one for each file
		var progress = new FileProgress(file, this.customSettings.progress_target);
		progress.setComplete();
		progress.setStatus("Complete.");
		progress.toggleCancel(false);
		
        document.getElementById("info").innerHTML = serverData;
		if (serverData.substring(4,0) == '<div') {
			this.customSettings.upload_successful = false;
		} else {
			this.customSettings.upload_successful = true;
            window.location = serverData ;
		}
		
}


function uploadSuccess(file, serverData) {
	try {
		var progress = new FileProgress(file, this.customSettings.progress_target);
		progress.setComplete();
		progress.setStatus("Виконано.");
		progress.toggleCancel(false);

	} catch (ex) {
		this.debug(ex);
	}
}

function uploadError(file, errorCode, message) {
	try {
		var progress = new FileProgress(file, this.customSettings.progress_target);
		progress.setError();
		progress.toggleCancel(false);

		var txtFileName = document.getElementById("txtFileName");
		txtFileName.value = "";

		switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
			progress.setStatus("Помилка: " + message);
			this.debug("Error Code: HTTP Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
			progress.setStatus("Не вдалось завантажити.");
			this.debug("Error Code: Upload Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.IO_ERROR:
			progress.setStatus("Server (IO) Error");
			this.debug("Error Code: IO Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
			progress.setStatus("Помилка безпеки");
			this.debug("Error Code: Security Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			progress.setStatus("Upload limit exceeded.");
			this.debug("Error Code: Upload Limit Exceeded, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
			progress.setStatus("Failed Validation.  Upload skipped.");
			this.debug("Error Code: File Validation Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
			// If there aren't any files left (they were all cancelled) disable the cancel button
			if (this.getStats().files_queued === 0) {
				document.getElementById(this.customSettings.cancelButtonId).disabled = true;
			}
			progress.setStatus("Скасовано");
			progress.setCancelled();
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			progress.setStatus("Зупинено");
			break;
		default:
			progress.setStatus("Unhandled Error: " + errorCode);
			this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}

function uploadComplete(file) {
	if (this.getStats().files_queued === 0) {
		document.getElementById(this.customSettings.cancelButtonId).disabled = true;
	}
}
function pageScroll() {
    	window.scrollBy(0,-35); // horizontal and vertical scroll increments
    	scrolldelay = setTimeout('pageScroll()',40); // scrolls every 100 milliseconds
}
function stopScroll() {
    	clearTimeout(scrolldelay);
}


function singleUploadComplete(file) {
	try {
		if (this.customSettings.upload_successful) {
			this.setButtonDisabled(true);
			uploadDone();
		} else {
			file.id = "singlefile";	// This makes it so FileProgress only makes a single UI element, instead of one for each file
			var progress = new FileProgress(file, this.customSettings.progress_target);
			progress.setError();
			progress.setStatus("File rejected");
			progress.toggleCancel(false);
			
			var txtFileName = document.getElementById("txtFileName");
			txtFileName.value = "";

            
	        setTimeout('pageScroll()', 1500);
	        setTimeout('stopScroll()', 4000);
		}
	} catch (e) {
        this.debug(e);
	}
}
// This event comes from the Queue Plugin
function queueComplete(numFilesUploaded) {
	var status = document.getElementById("divStatus");
	status.innerHTML = "Завантажено файлів:" + numFilesUploaded ;
}
