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

function reqCfCookieUrl(assetInfo) {
    const assetId = assetInfo.split('_')[0]
    const profile = assetInfo.split('_')[1]
    $.ajax({
        url: `/api/vod/${assetId}/${profile}/cf-key`,
        processData: false,
        contentType: false,
        type: 'GET',
        success: async function(result){
            const tgUrl = result['message']['key']
            const signedCookie = result['message']['cookie']
            
            console.log(signedCookie)
            await setCookie(signedCookie)
            // console.log(tgUrl)
            // window.location.href = tgUrl
            console.log(location.origin)
            $.ajax({
                url: tgUrl,
                processData: false,
                contentType: false,
                type: 'GET',
                success: async function(result){
                    console.log(result)
                },
                error:function(request, status, error){
                    alert(
                        "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error
                    );
                }
            });
        },
        error:function(request, status, error){
            alert(
                "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error
            );
        }
    });
}

async function setCookie(cookieObj) {
    return new Promise((resolve, reject) => {
        const CF_POLICY = "CloudFront-Policy"
        const CF_KP_ID = "CloudFront-Key-Pair-Id"
        const CF_SIGN = "CloudFront-Signature"

        document.cookie = CF_POLICY + "=" + ''
        document.cookie = CF_KP_ID + "=" + ''
        document.cookie = CF_SIGN + "=" + ''
        

        // document.cookie = CF_POLICY + "=" + cookieObj[CF_POLICY] + "; domain=cdn-s3.ab-aihelper.xyz"
        // document.cookie = CF_KP_ID + "=" + cookieObj[CF_KP_ID] + "; domain=cdn-s3.ab-aihelper.xyz"
        // document.cookie = CF_SIGN + "=" + cookieObj[CF_SIGN] + "; domain=cdn-s3.ab-aihelper.xyz"

        document.cookie = CF_POLICY + "=" + cookieObj[CF_POLICY]
        document.cookie = CF_KP_ID + "=" + cookieObj[CF_KP_ID]
        document.cookie = CF_SIGN + "=" + cookieObj[CF_SIGN]

        console.log(document.cookie)

        resolve(null)
    })
}