var input = require('fs').createReadStream(
	require('path').join(
		__dirname,
		'build/distributions/tokenapp-keygeneration-1.1/bin/public.csv'
	)
);

var outputPath = require('path').join(
	__dirname,
	'build/distributions/tokenapp-keygeneration-1.1/bin/public.sql'
);
require('fs').unlinkSync(outputPath);
require('fs').writeFileSync(outputPath, 'CREATE SEQUENCE fresh_key START WITH 1 INCREMENT BY 1;\n');

var lineReader = require('readline').createInterface({
	input: input
});

var lineNo = 0;

lineReader.on('line', function(line) {
    if (lineNo == 0) {
        lineNo++;
		return;
	}
    lineNo++;
	const split = line.split(',');
	require('fs').appendFileSync(
		outputPath,
        "INSERT INTO keypairs (id, public_btc, public_eth) VALUES ('" +
            lineNo +         
            "','" +
			split[0] +
			"','" +
			split[1] +
			"');\n"
	);
});
