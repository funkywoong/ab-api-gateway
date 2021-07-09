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
                const assetId = listInfo[key].vod_asset_id
                const vodName = listInfo[key].vod_name
                var child = `<li><a href=\"javascript:reqCfCookieUrlForEFS(\'${assetId}\')\"><strong>${vodName}:</strong></a> \
                ${listInfo[key].vod_asset_id}</li>`
                $('#efs-mylist').append(child)
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
            $("#s3-mylist").empty()
            const listInfo = result['message']['results']

            for (key in listInfo) {
                const assetId = listInfo[key].vod_asset_id
                const vodName = listInfo[key].vod_name
                const profOption = ['360', '540', '720']
                for (var i=0; i<3; i++) {
                    var child = `<li><a href=\"javascript:reqCfCookieUrlForS3(\'${assetId}_${profOption[i]}\')\"><strong>${vodName}_${profOption[i]}:</strong></a> \
                    ${assetId}</li>`
                    $('#s3-mylist').append(child)
                }
            }
        },
        error:function(request, status, error){
            alert(
                "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error
            );
        }
    });
}

function reqCfCookieUrlForS3(assetInfo) {
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
            
            await setCookie(signedCookie)
            window.open(tgUrl).focus()
        },
        error:function(request, status, error){
            alert(
                "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error
            );
        }
    });
}

function reqCfCookieUrlForEFS(assetId) {
    $.ajax({
        url: `/api/efs/assets/${assetId}`,
        processData: false,
        contentType: false,
        type: 'GET',
        success: async function(result){
            const tgUrl = result['message']['key']
            const signedCookie = result['message']['cookie']
            
            await setCookie(signedCookie)
            window.open(tgUrl).focus()
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
        

        document.cookie = CF_POLICY + "=" + cookieObj[CF_POLICY] + "; domain=.ab-aihelper.xyz"
        document.cookie = CF_KP_ID + "=" + cookieObj[CF_KP_ID] + "; domain=.ab-aihelper.xyz"
        document.cookie = CF_SIGN + "=" + cookieObj[CF_SIGN] + "; domain=.ab-aihelper.xyz"

        resolve(null)
    })
}

function loadTestToEFS() {
    console.log('in efs test')
    var cnt = 0
    while(true) {
        sleep(10)
        $.ajax({
            url: '/api/efs/',
            processData: false,
            contentType: false,
            type: 'GET'
        });
        console.log(cnt)
        if (cnt > 100) {
            break
        }
        cnt = cnt + 1
    }
}

function loadTestToS3() {
    console.log('in s3 test')
    var cnt = 0
    while(true) {
        sleep(10)
        $.ajax({
            url: '/api/vod/',
            processData: false,
            contentType: false,
            type: 'GET'
        });
        console.log(cnt)
        if (cnt > 100) {
            break
        }
        cnt = cnt + 1
    }
}

function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
}