enum AVAILABLE_SOCKETS {
  BINANCE = "binance",
}

import { Socket, io } from "socket.io-client";

export default class WSService {
  private static instance: WSService;
  public connectedToWs: { binance: boolean } = { binance: false };
  private binance!: Socket;
  private subscribedMarket?: string;
  private subscribedToStream: boolean = false;
  private retries = { binance: 0 };
  private onDataReceived?: (data: any) => void; // Callback for received data

  constructor() {
    this.initializeWs();
  }

  public static getInstance(): WSService {
    if (!WSService.instance) {
      WSService.instance = new WSService();
    }
    return WSService.instance;
  }

  private setWsConnected(socket: AVAILABLE_SOCKETS) {
    this.connectedToWs[socket] = true;
    this.retries[socket] = 0;
    console.log(`${socket} WS connection status: connected`);
  }

  public subscribeToStream({
    market,
    interval,
  }: {
    market: string;
    interval: string;
  }) {
    if (this.subscribedToStream || !this.binance) return;
    this.subscribedMarket = market;
    this.subscribedToStream = true;

    this.binance.emit("stream", { market, interval });

    console.log(`Subscribed to market: ${market}, interval: ${interval}`);
  }

  private retryConnection(socket: AVAILABLE_SOCKETS) {
    if (this.retries[socket] < 5) {
      setTimeout(() => {
        if (socket === AVAILABLE_SOCKETS.BINANCE) this.initializeParifiWs();
      }, 1000 * this.retries[socket]);
      this.retries[socket]++;
    } else {
      console.error("Failed to connect after 5 attempts");
    }
  }

  public handleDisconnect(socket: AVAILABLE_SOCKETS) {
    this.connectedToWs[socket] = false;
    this.retryConnection(socket);
  }

  public handleConnect(socket: AVAILABLE_SOCKETS) {
    this.setWsConnected(socket);
  }

  public handleError(socket: AVAILABLE_SOCKETS, e: any) {
    console.log(`${socket} ws error`, e);
  }

  public async closeWs() {
    this?.binance?.close?.();
  }

  public async initializeParifiWs() {
    if (this.binance) {
      this.binance.close();
    }

    this.binance = io("ws://localhost:3000");

    this.binance.on("connect", () =>
      this.setWsConnected(AVAILABLE_SOCKETS.BINANCE)
    );
    this.binance.on("connect_error", () => {
      this.connectedToWs.binance = false;
      this.retryConnection(AVAILABLE_SOCKETS.BINANCE);
    });

    // Listen for "binance-data" event
    this.binance.on("binance-data", (data) => {
      console.log("Received binance-data:", data);
      if (this.onDataReceived) {
        this.onDataReceived(data);
      }
    });
  }

  public async initializeWs() {
    this.initializeParifiWs();
  }

  public setOnDataReceivedCallback(callback: (data: any) => void) {
    this.onDataReceived = callback;
  }
}
