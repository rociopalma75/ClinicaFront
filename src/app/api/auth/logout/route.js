import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET() {    
    const cookieStore = await cookies();
    const token = await cookieStore.get("token");

    console.log("Token: ", token);

    try {
        cookieStore.delete("token");
      return NextResponse.json({message:"Sesión cerrada exitosamente", status:200}, { status: 200 });
    } catch (error) {

      if (error.response) {
        console.log(error.response.data);
        return NextResponse.json({message:error.response.data, status:error.response.status}, { status: 200 });
      } else {
        // Error general (como problemas de red)
        return NextResponse.json({ error: 'Error en la petición', details: error.message }, { status: 200 });
      }
    }
}
