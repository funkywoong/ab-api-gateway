function loadTestToEFS() {
    console.log('in efs test')
    var cnt = 0
    while(true) {
        sleep(10)
        // $.ajax({
        //     url: '/api/efs/',
        //     processData: false,
        //     contentType: false,
        //     type: 'GET',
        //     success: function(result){
        //         console.log(cnt)
        //         cnt = cnt + 1
        //     },
        //     error:function(request, status, error){
        //         alert(
        //             "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error
        //         );
        //     }
        // });
        console.log(cnt)
        if (cnt > 100) {
            break
        }
        cnt = cnt + 1
    }
}

function loadTestToS3() {
    while(true) {
        $.ajax({
            url: '/api/vod/',
            processData: false,
            contentType: false,
            type: 'GET',
            success: function(result){
            },
            error:function(request, status, error){
                alert(
                    "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error
                );
            }
        });
    }
}

function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
}

loadTestToEFS()