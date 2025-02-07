import { NextResponse } from "next/server";

// app/api/delete-file/route.ts
export async function DELETE(req: Request) {
    const { fileUrl } = await req.json();
    

    try {
      const url = new URL(fileUrl);
      const fileUuid = url.pathname.split('/')[1];
      
      const response = await fetch(
        `https://api.uploadcare.com/files/${fileUuid}/storage/`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Uploadcare.Simple ${process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}:${process.env.NEXT_PUBLIC_UPLOADCARE_SECRET_KEY}`,
            'Accept': 'application/vnd.uploadcare-v0.7+json'
          }
        }
      );
  
      if (!response.ok) throw new Error('Deletion failed');
      
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json(
        { error: 'File deletion failed' },
        { status: 500 }
      );
    }
  }