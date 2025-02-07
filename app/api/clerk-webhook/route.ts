import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {id, email_addresses, first_name, image_url } = body?.data;

        const email = email_addresses[0].email_address;
        console.log('Webhook received',body);

        await db.user.upsert({
            where:{clerkId: id},
            update:{
                email,
                name: first_name,
                profileImage: image_url,
            },
            create:{
                clerkId: id,
                email,
                name: first_name || '',
                profileImage: image_url || '',
            },
        });

        return NextResponse.json({message: 'User created or updated in database successfully'},{
            status: 200,
        });
    } catch(error){
        console.error('Error creating or updating user in database', error);
        return NextResponse.json({message: 'Error creating or updating user in database'},{
            status: 500,
        });
    }
}

