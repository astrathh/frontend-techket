"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Share2, Calendar, Clock, MapPin, ShoppingCart, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "@/components/event-card";
import Header from "@/components/layout/header";

export default function EventPage() {
  
  // Estados para controlar quantidade e tipo de ingressos
  const [quantity, setQuantity] = useState(2);
  const [selectedTicket, setSelectedTicket] = useState({
    type: "Pista",
    price: 89.99,
    description: "Standing room only"
  });
  
  // Estados para controlar o modal de pagamento
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  
  // Tickets disponíveis
  const availableTickets = [
    { type: "Pista", price: 89.99, description: "Lugares não demarcados" },
    { type: "Pacote VIP", price: 199.99, description: "Assento Premium + Meet & Greet" },
    { type: "Pista Premium", price: 129.99, description: "Lugares reservados" }
  ];
  
  // Cálculos para checkout
  const subtotal = selectedTicket.price * quantity;
  const serviceFee = 15.00;
  const facilityFee = 5.00;
  const total = subtotal + serviceFee + facilityFee;
  
  // Função para lidar com a seleção de tickets
  // Interface for ticket type
  interface Ticket {
    type: string;
    price: number;
    description: string;
  }

  // Função para lidar com a seleção de tickets
  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };
  
  // Função para aumentar a quantidade
  const increaseQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };
  
  // Função para diminuir a quantidade
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  
  // Função para abrir o modal de pagamento
  const handleBuyNow = () => {
    setPaymentCompleted(false);
    setIsPaymentModalOpen(true);
  };
  
  // Função para simular a confirmação de pagamento
  const handleConfirmPayment = () => {
    setPaymentCompleted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Main Content */}
      <main className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/events" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Eventos
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden mb-6">
              <img src="/placeholder.svg?height=600&width=1200" alt="Event" className="w-full h-[400px] object-cover" />
              <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">Música</Badge>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">World Tour 2025: Live in Concert</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm">April 22, 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-sm">8:00 PM - 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm">Madison Square Garden, New York</p>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="details" className="mb-8">
              <TabsList className="grid w-full grid-cols-3 bg-gray-50">
                <TabsTrigger value="details">Detalhes</TabsTrigger>
                <TabsTrigger value="venue">Local</TabsTrigger>
                <TabsTrigger value="organizer">Organizador</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-4">
                <h3 className="text-xl font-medium mb-3">About This Event</h3>
                <p className="text-gray-600 mb-4">
                  Don't miss the most anticipated concert of the year! Join us for an unforgettable night of music and
                  entertainment featuring chart-topping hits and spectacular performances.
                </p>
                <p className="text-gray-600 mb-4">
                  This world tour has been selling out venues across the globe, with critics calling it "the must-see
                  musical event of the decade." The show features state-of-the-art production, stunning visuals, and a
                  full backing band.
                </p>
                <h3 className="text-xl font-medium mb-3 mt-6">What to Expect</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>3+ hours of live music</li>
                  <li>Special guest appearances</li>
                  <li>Exclusive merchandise</li>
                  <li>State-of-the-art sound and lighting</li>
                </ul>
                <p className="text-gray-600">
                  Please note that photography and recording are not permitted during the performance. Doors open at
                  7:00 PM, and we recommend arriving early to avoid lines.
                </p>
              </TabsContent>
              <TabsContent value="venue" className="pt-4">
                <h3 className="text-xl font-medium mb-3">Madison Square Garden</h3>
                <p className="text-gray-600 mb-4">
                  Madison Square Garden is a multi-purpose indoor arena in New York City. Located in Midtown Manhattan
                  between 7th and 8th Avenues from 31st to 33rd Streets, it is situated atop Pennsylvania Station.
                </p>
                <div className="rounded-xl overflow-hidden h-[300px] mb-4">
                  <img
                    src="/placeholder.svg?height=600&width=1200"
                    alt="Madison Square Garden"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium mb-3">Facilities</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Accessible seating</li>
                  <li>Food and beverage concessions</li>
                  <li>Merchandise stands</li>
                  <li>Restrooms on all levels</li>
                  <li>ATMs</li>
                </ul>
              </TabsContent>
              <TabsContent value="organizer" className="pt-4">
                <h3 className="text-xl font-medium mb-3">Event Organizer</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="Organizer logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Global Entertainment Group</h4>
                    <p className="text-sm text-gray-600">Premier event organizer since 2005</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Global Entertainment Group specializes in producing world-class concerts, festivals, and live
                  entertainment events. With over 500 successful events across 30 countries, they are known for their
                  exceptional production quality and unforgettable experiences.
                </p>
                <Button variant="outline" className="rounded-full">
                  Contatar Organizador
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-gray-100 overflow-hidden bg-white shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Comprar Ingressos</h2>
                
                {/* Opções de tickets com seleção */}
                <div className="space-y-4 mb-6">
                  {availableTickets.map((ticket) => (
                    <div 
                      key={ticket.type}
                      className={`flex justify-between items-center pb-4 border-b border-gray-100 cursor-pointer ${
                        selectedTicket.type === ticket.type ? 'bg-gray-50 -mx-6 px-6' : ''
                      }`}
                      onClick={() => handleTicketSelect(ticket)}
                    >
                      <div>
                        <p className="font-medium">{ticket.type}</p>
                        <p className="text-sm text-gray-600">{ticket.description}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-bold">R${ticket.price.toFixed(2)}</p>
                        {selectedTicket.type === ticket.type && (
                          <div className="ml-2 bg-blue-100 text-blue-700 rounded-full p-1">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-sm font-medium">Selecionar quantidade:</p>
                  <div className="flex border border-gray-200 rounded-full overflow-hidden">
                    <button 
                      className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600"
                      onClick={decreaseQuantity}
                    >-</button>
                    <div className="flex-1 text-center py-2">{quantity}</div>
                    <button 
                      className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600"
                      onClick={increaseQuantity}
                    >+</button>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Preço do Ingresso (x{quantity})</span>
                    <span>R${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxa de Serviço</span>
                    <span>R${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxa de Facilidade</span>
                    <span>R${facilityFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-4 border-t border-gray-100">
                    <span>Total</span>
                    <span>R${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-3 w-full">
                  <Button 
                    variant="outline" 
                    className="flex-1 rounded-full border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                  <Button 
                    className="flex-1 rounded-full bg-black text-white hover:bg-gray-800"
                    onClick={handleBuyNow}
                  >
                    Comprar
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Comprando os ingressos, você concorda com os <Link href="">Termos e Condições</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Events */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Você Também Pode Curtir...</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <EventCard key={i} />
            ))}
          </div>
        </section>
      </main>
      
      {/* Modal de pagamento customizado */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {paymentCompleted ? "Pagamento Confirmado!" : "Finalizar Compra"}
                </h3>
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="text-sm text-gray-600 mb-6">
                {paymentCompleted 
                  ? "Pagamento confirmado! Use o QR Code abaixo para acessar seus ingressos."
                  : "Escaneie o QR Code abaixo com seu aplicativo bancário para finalizar o pagamento."}
              </div>
              
              {paymentCompleted ? (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center rounded-full bg-green-100 h-12 w-12 mx-auto">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-green-600">Pagamento Confirmado!</h3>
                  <p className="text-sm text-gray-500">
                    Seus ingressos foram enviados para seu email. Você também pode acessá-los na seção "Meus Tickets".
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Evento:</span>
                      <span className="font-medium">World Tour 2025: Live in Concert</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Tipo de Ingresso:</span>
                      <span className="font-medium">{selectedTicket.type}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Quantidade:</span>
                      <span className="font-medium">{quantity}</span>
                    </div>
                    <div className="flex justify-between font-medium mt-2 pt-2 border-t border-gray-200">
                      <span>Total Pago:</span>
                      <span>R${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* QR Code simulado */}
                  <div className="mx-auto w-56 h-56 p-2 bg-white rounded-md shadow-md flex items-center justify-center">
                    <div className="w-48 h-48 bg-black p-4">
                      <div className="w-full h-full bg-white p-4">
                        <div className="grid grid-cols-5 grid-rows-5 gap-1 w-full h-full">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`bg-black rounded-sm ${Math.random() > 0.6 ? 'opacity-100' : 'opacity-0'}`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs mt-2 text-gray-500">
                    Ticket ID: TKT-{Math.floor(1000000 + Math.random() * 9000000)}
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-4">Resumo da Compra</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{selectedTicket.type} (x{quantity})</span>
                        <span>R${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Taxas de Serviço</span>
                        <span>R${serviceFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Taxas do Local</span>
                        <span>R${facilityFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium pt-2 mt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span>R${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* QR Code de pagamento simulado */}
                  <div className="mx-auto w-56 h-56 p-2 bg-white rounded-md shadow-md flex items-center justify-center">
                    <div className="w-48 h-48 bg-black p-4">
                      <div className="w-full h-full bg-white p-4">
                        <div className="grid grid-cols-5 grid-rows-5 gap-1 w-full h-full">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`bg-black rounded-sm ${Math.random() > 0.6 ? 'opacity-100' : 'opacity-0'}`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Escaneie este QR Code com seu aplicativo bancário ou carteira digital para realizar o pagamento.
                  </p>
                </div>
              )}
              
              <div className="flex flex-row-reverse gap-3 mt-6">
                {paymentCompleted ? (
                  <Button
                    className="w-full rounded-full bg-black text-white hover:bg-gray-800"
                    onClick={() => setIsPaymentModalOpen(false)}
                  >
                    Concluir
                  </Button>
                ) : (
                  <>
                    <Button
                      className="rounded-full bg-black text-white hover:bg-gray-800"
                      onClick={handleConfirmPayment}
                    >
                      Confirmar Pagamento
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => setIsPaymentModalOpen(false)}
                    >
                      Cancelar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Techket. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((social) => (
                <Link key={social} href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}