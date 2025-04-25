import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('Callback route hit');
  console.log('Full URL:', request.url);
  
  const searchParams = request.nextUrl.searchParams;
  console.log('All search params:', Object.fromEntries(searchParams));

  // Return HTML response with instructions
  return new NextResponse(
    `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Shopify Custom App Setup</title>
        <style>
          body { 
            font-family: system-ui; 
            padding: 2rem; 
            line-height: 1.5;
            max-width: 800px;
            margin: 0 auto;
          }
          .instructions { 
            background: #fff8e1;
            padding: 1rem;
            border-radius: 4px;
            margin: 1rem 0;
          }
          .step {
            margin: 1rem 0;
            padding: 1rem;
            background: #f5f5f5;
            border-radius: 4px;
          }
          .step h3 {
            margin-top: 0;
            color: #2e7d32;
          }
          .note {
            background: #e3f2fd;
            padding: 1rem;
            border-radius: 4px;
            margin: 1rem 0;
          }
          .warning {
            background: #ffebee;
            color: #c62828;
            padding: 1rem;
            border-radius: 4px;
            margin: 1rem 0;
          }
          .scopes {
            background: #e8f5e9;
            padding: 1rem;
            border-radius: 4px;
            margin: 1rem 0;
          }
          .scopes ul {
            list-style: none;
            padding: 0;
          }
          .scopes li {
            padding: 0.5rem;
            border-bottom: 1px solid #c8e6c9;
          }
          .scopes li:last-child {
            border-bottom: none;
          }
          .credentials {
            background: #f3e5f5;
            padding: 1rem;
            border-radius: 4px;
            margin: 1rem 0;
          }
          .credentials pre {
            background: #fff;
            padding: 1rem;
            border-radius: 4px;
            border: 1px solid #e1bee7;
          }
        </style>
      </head>
      <body>
        <h1>Shopify Custom App Setup</h1>
        <div class="warning">
          <h3>⚠️ Important: Go to Store Admin</h3>
          <p>You need to access your Shopify store admin, not the Partners dashboard.</p>
          <p>Visit: <a href="https://bandayglam-dev.myshopify.com/admin" target="_blank">https://bandayglam-dev.myshopify.com/admin</a></p>
        </div>
        <div class="instructions">
          <h2>How to Get Your API Credentials</h2>
          <div class="step">
            <h3>Step 1: Enable Custom App Development</h3>
            <ol>
              <li>Log in to your Shopify store admin (not Partners dashboard)</li>
              <li>Go to Settings > Apps and sales channels</li>
              <li>Click "Develop apps"</li>
              <li>Click "Allow Custom App Development"</li>
            </ol>
          </div>
          <div class="step">
            <h3>Step 2: Configure Your App</h3>
            <ol>
              <li>Click "Create an app"</li>
              <li>Give your app a name</li>
              <li>Add your email as the app developer</li>
              <li>Go to the "Configuration" tab</li>
              <li>Click "Configure"</li>
              <li>Under "Admin API Integration", select these scopes:</li>
            </ol>
            <div class="scopes">
              <ul>
                <li>✅ read_products</li>
                <li>✅ write_products</li>
                <li>✅ read_orders</li>
                <li>✅ write_orders</li>
                <li>✅ read_inventory</li>
                <li>✅ write_inventory</li>
              </ul>
            </div>
            <ol start="7">
              <li>Click "Save"</li>
            </ol>
          </div>
          <div class="step">
            <h3>Step 3: Get Your API Credentials</h3>
            <ol>
              <li>Go to the "API Credentials" tab</li>
              <li>You'll see your API key and API secret key</li>
              <li>Copy both values</li>
            </ol>
          </div>
          <div class="credentials">
            <h3>Add to Your .env.local File</h3>
            <p>Add these lines to your <code>.env.local</code> file:</p>
            <pre>SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret</pre>
          </div>
          <div class="note">
            <h3>Next Steps</h3>
            <ol>
              <li>Add the credentials to your <code>.env.local</code> file</li>
              <li>Restart your development server</li>
              <li>Try accessing the Shopify API endpoints</li>
            </ol>
          </div>
        </div>
      </body>
    </html>
    `,
    {
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
} 