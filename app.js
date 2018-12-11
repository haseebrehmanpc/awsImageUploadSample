var albumBucketName = '<BUCKET_NAME_HERE>';
var bucketRegion = 'us-east-1';
// var IdentityPoolId = 'IDENTITY_POOL_ID';

AWS.config.update({
    region: bucketRegion,
    signatureVersion: ''
});
var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: albumBucketName }
});


function addPhoto() {
    var files = document.getElementById('photoupload').files;
    if (!files.length) {
        return alert('Please choose a file to upload first.');
    }
    var file = files[0];
    var fileName = file.name;
    var albumPhotosKey = 'direct-uploads/testingAWS3/';
    
    var photoKey = albumPhotosKey + fileName;
    s3.api.signatureVersion = '';
    console.log(AWS.config, s3);
    s3.upload({
        Key: photoKey,
        Body: file,
        ACL: 'public-read'
    }, function (err, data) {
        console.log(err, data);
        if (err) {
            return alert('There was an error uploading your photo: ', err.message);
        }
        alert('Successfully uploaded photo.');
    });
}