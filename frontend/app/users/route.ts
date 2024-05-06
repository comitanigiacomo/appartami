// app/users/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // Fai ciò che desideri con la richiesta
    // Ad esempio, restituisci una risposta con il contenuto della pagina degli utenti
    return new NextResponse("<h1>Benvenuti nella pagina degli utenti!</h1>");
}
