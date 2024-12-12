import axios from "axios";
import { NextResponse } from "next/server";
import https from "https";

// Crear un agente https que ignore los certificados inválidos
const agent = new https.Agent({  
  rejectUnauthorized: false  // Desactiva la validación del certificado
});


export async function GET(request, {params}) {
    const { nombre } = await params;

    const url = `https://istp1service.azurewebsites.net/api/servicio-salud/medicamentos?descripcion=${nombre}`;
    
    const config = {
      httpsAgent: agent // Configuración del agente HTTPS
    };

    try {
      const response = await axios.get(url, config);
      const res = await NextResponse.json({medicamentos: response.data, status: response.status});
      console.log(res);
      return res;
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
