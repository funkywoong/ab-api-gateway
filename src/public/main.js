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
                alert("S3 Upload complete!!");
            },
            error:function(request, status, error){
                alert(
                    "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error
                );
            }
        });
    } else if (tarStr === "EFS") {
        formData.append("vodFile", vodObj)

        $.ajax({
            url: '/api/efs/',
            processData: false,
            contentType: false,
            data: formData,
            type: 'POST',
            success: function(result) {
                alert("EFS Upload complete!")
            },
            error:function(request, status, error){
                alert(
                    "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error
                );
            }
        })
    }
}

function refreshEFSList() {
    $.ajax({
        url: '/api/efs/',
        processData: false,
        contentType: false,
        type: 'GET',
        success: function(result){
            const listInfo = result['message']['results']
            $("#efs-mylist").empty()
            for (key in listInfo) {
                console.log('in for')
                var child = `<li><strong>${listInfo[key].vod_name}:</strong> ${listInfo[key].vod_asset_id}</li>`
                $("#s3-mylist").append(child)
            }
        },
        error:function(request, status, error){
            alert(
                "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error
            );
        }
    });
}

function refreshS3List() {
    $.ajax({
        url: '/api/vod/',
        processData: false,
        contentType: false,
        type: 'GET',
        success: function(result){
            const listInfo = result['message']['results']
            $("#efs-mylist").empty()
            for (key in listInfo) {
                console.log('in for')
                var child = `<li><strong>${listInfo[key].vod_name}:</strong> ${listInfo[key].vod_asset_id}</li>`
                $("#efs-mylist").append(child)
            }
        },
        error:function(request, status, error){
            alert(
                "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error
            );
        }
    });
}