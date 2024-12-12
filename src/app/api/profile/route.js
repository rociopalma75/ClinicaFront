import { NextResponse } from "next/server"
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'IngenieraSoftware-TFI-Clinica2024.';

export async function GET() {
    const cookieStore = await cookies();
    const token = await cookieStore.get("token");
    if (!token) {
        return NextResponse.json({ error: 'No se ha iniciado sesión' }, { status: 401 });
    }
    
    try {
      const decodedToken = jwt.verify(token.value, SECRET_KEY);
      return NextResponse.json(decodedToken);
    } catch (error) {
        console.error("Error decoding token: ", error);
        return NextResponse.json({ error: 'Error decodificando el token' }, { status: 401 });
    }
}
