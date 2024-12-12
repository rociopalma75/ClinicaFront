import axios from "axios";
import { NextResponse } from "next/server";
import https from "https";
import { cookies } from "next/headers";

// Crear un agente https que ignore los certificados inválidos
const agent = new https.Agent({  
  rejectUnauthorized: false  // Desactiva la validación del certificado
});


export async function POST(request, { params }) {
    const { id, descripcion, idEvolucion } = await params;
    
    const data = await request.json();
    const cookieStore = await cookies();
    const token = await cookieStore.get("token");

    const url = `https://localhost:7011/api/Clinica/Pacientes/${id}/Diagnosticos/${descripcion}/Evoluciones/${idEvolucion}/Pedido`;


    const config = {
      httpsAgent: agent, // Configuración del agente HTTPS
      headers: {
        'Authorization': `Bearer ${token.value}` // Agregar el token a los encabezados
      }
    };

    try {
      const response = await axios.post(url, data, config);
      const res = await NextResponse.json({paciente: response.data, status: response.status});
      return res;
    } catch (error) {

      if (error.response) {
        return NextResponse.json({message:error.response.data, status:error.response.status}, { status: 200 });
      } else {
        // Error general (como problemas de red)
        return NextResponse.json({ error: 'Error en la petición', details: error.message }, { status: 200 });
      }
    }
}
