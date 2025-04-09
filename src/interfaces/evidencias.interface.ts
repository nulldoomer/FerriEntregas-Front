export interface Evidencia {
  id: string;
    url: string;
}
export interface evideceRequest {
  deliveryId:string;
  url: string[]
}
export interface EvidenciasResponse {
    result: Evidencia[];
    code:string;
    success:string;
}