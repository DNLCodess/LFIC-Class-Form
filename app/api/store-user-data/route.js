import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(request) {
  try {
    const userData = await request.json();
    
    // Initialize Google Sheets
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    // Get the first sheet (or create if doesn't exist)
    let sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      sheet = await doc.addSheet({ 
        title: 'Student Registrations',
        headerValues: [
          'Timestamp',
          'Surname',
          'Middle Name',
          'First Name',
          'Date of Birth',
          'Gender',
          'Email',
          'Phone',
          'Address',
          'Computing Knowledge',
          'Has Computer',
          'Using Phone',
          'Payment Reference',
          'Transaction ID',
          'Payment Status',
          'Payment Date'
        ]
      });
    }

    // Add the user data to the sheet
    await sheet.addRow({
      'Timestamp': new Date().toISOString(),
      'Surname': userData.surname || '',
      'Middle Name': userData.middlename || '',
      'First Name': userData.firstname || '',
      'Date of Birth': userData.dob || '',
      'Gender': userData.gender || '',
      'Email': userData.email || '',
      'Phone': userData.phone || '',
      'Address': userData.address || '',
      'Computing Knowledge': userData.computingKnowledge || '',
      'Has Computer': userData.hasComputer || '',
      'Using Phone': userData.usingPhone || '',
      'Payment Reference': userData.paymentReference || '',
      'Transaction ID': userData.transactionId || '',
      'Payment Status': userData.paymentStatus || '',
      'Payment Date': userData.paymentDate || '',
    });

    return NextResponse.json({ success: true, message: 'User data stored successfully' });
  } catch (error) {
    console.error('Error storing user data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to store user data' },
      { status: 500 }
    );
  }
}