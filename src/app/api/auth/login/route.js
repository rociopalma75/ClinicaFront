import axios from "axios";
import { NextResponse } from "next/server";
import https from "https";

// Crear un agente https que ignore los certificados inválidos
const agent = new https.Agent({  
  rejectUnauthorized: false  // Desactiva la validación del certificado
});


export async function POST(request) {
    const data = await request.json();

    const url = "https://localhost:7011/api/Clinica/Medico/Login";
    
    const config = {
      httpsAgent: agent // Configuración del agente HTTPS
    };

    try {
      const response = await axios.post(url, data, config);
      const resWithCookies = await NextResponse.json(response.data);
      const token = response.data.token;
      resWithCookies.cookies.set({name:'token', value: token, sameSite: "strict", httpOnly: true,
        secure: process.env.NODE_ENV === "production"});
      // res.cookies.set({name:'token', value:response.data.token})
      return resWithCookies;
      
    } catch (error) {
      if (error.response) {
        return NextResponse.json(error.response.data, { status: error.response.status });
      } else {
        // Error general (como problemas de red)
        return NextResponse.json({ error: 'Error en la petición', details: error.message }, { status: 500 });
      }
    }
}
