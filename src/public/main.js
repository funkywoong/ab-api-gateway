function uploadFile() {
    let form = $('#upload-info')[0]
    var formData = new FormData()

    console.log(formData)

    let tarStr = $('#target-storage').val()
    let vodObj = $("#vod-file-tag0")[0].files[0]

    // formData.append("target", tarStr)

    if (tarStr === "S3") {
        formData.append("vodFile", vodObj);

        $.ajax({
            url: '/api/vod/',
                    processData: false,
                    contentType: false,
                    data: formData,
                    type: 'POST',
                    success: function(result){
                        alert("Upload complete!!");
                    },
                    error:function(request, status, error){
                        alert(
                            "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error
                        );
                    }
        });
    }

}