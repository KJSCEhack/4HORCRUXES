var BinaryServer = require('binaryjs').BinaryServer;
var wav = require('wav');



module.exports={

soundrecserver:function(){
  var outFile = 'demo.wav';
  binaryServer = BinaryServer({port: 9001});

  binaryServer.on('connection', function(client) {
    console.log('new connection');
  
    var fileWriter = new wav.FileWriter(outFile, {
      channels: 1,
      sampleRate: 48000,
      bitDepth: 16
    });
  
    client.on('stream', function(stream, meta) {
      console.log('new stream');
      stream.pipe(fileWriter);
  
      stream.on('end', function() {
        fileWriter.end();
        console.log('wrote to file ' + outFile);
      });
    });
  });

}




}
