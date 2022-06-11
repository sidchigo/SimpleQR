function generateQR(e) {
	try {
		e.preventDefault();

		// check if link is from google drive
		let link = document.getElementById('link').value;
		const isDriveLink = link.includes('drive.google.com');
		if (isDriveLink) {
			link = link
				.replace('file/d/', 'uc?id=')
				.replace('/view?usp=sharing', '&export=download');
		}

		// Generate QR code
		if (link) {
			document.getElementById('qrcode').innerHTML = '';
			new QRCode('qrcode', {
				text: link,
				colorDark: '#0B0835',
				colorLight: '#ffffff',
				correctLevel: QRCode.CorrectLevel.H,
			});
		}
	} catch (err) {
		console.log(err);
	}
}

function downloadQR() {
	// Get image and canvas tag from generated QR
	const img = qrcode.getElementsByTagName('img')[0];
	const canvas = qrcode.getElementsByTagName('canvas')[0];
    const companyName = document.getElementById('companyName').value;
	const imageDimensions = 750;

    // load google fonts
    WebFont.load({
		google: {
			families: ['Inter'],
		},
        active: function() {
            displayText();
        }
	});

	// Padding to QRCode
	const padding = 50;

	// Adding padding to width and height
	canvas.width = 1157;
	canvas.height = 2161;

	// Canvas context
	const context = canvas.getContext('2d');
	// Clearing previous content
	context.clearRect(0, 0, canvas.width, canvas.height);
	// adding gradient background
    let gradient = context.createLinearGradient(
		0,
		0,
		canvas.width,
		canvas.height
	);
	gradient.addColorStop(0, '#E6E2F8');
	gradient.addColorStop(1, '#3B39C9');
    context.fillStyle = gradient;
	context.fillRect(0, 0, canvas.width, canvas.height);

    // Adding white background
	context.fillStyle = '#ffffff';
	context.fillRect(
		padding,
		padding,
		canvas.width - 2 * padding,
		canvas.height - 2 * padding
	);

	// Adding QR code at center
	context.drawImage(
		img,
		canvas.width / 2 - imageDimensions / 2,
		canvas.height / 2 - imageDimensions / 2,
		750,
		750
	);

    function displayText() {
        if (companyName) {
			context.font = 'bold 75px Inter';
			context.textAlign = 'center';
			context.fillStyle = '#3B39C9';
			context.fillText(companyName, canvas.width / 2, 250);
		}

		// scan now text
		context.font = 'bold 50px Inter';
		context.textAlign = 'center';
		context.fillStyle = '#3B39C9';
		context.fillText(
			'Scan now to view catalogue.',
			canvas.width / 2,
			canvas.height - 250
		);
    }

    displayText();

	// Getting base64 url
	const image = canvas.toDataURL('image/png', 1);
	const filename = 'QR_Code_' + Date.now() + '.png';

	// Creating hidden <a> tag to download
	let element = document.createElement('a');
	element.setAttribute('href', image);
	element.setAttribute('download', filename);
	element.setAttribute('class', 'hide');
	document.body.appendChild(element);
    element.click();
	document.body.removeChild(element);
}
