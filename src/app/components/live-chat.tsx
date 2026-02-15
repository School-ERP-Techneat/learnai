import { useEffect, useRef, useState } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Send,
  FileText,
  Shield,
} from "lucide-react";
import { Button } from "../components/ui/button";

export default function LiveChat() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const [blur, setBlur] = useState(false);

  const [chat, setChat] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [docs, setDocs] = useState<File[]>([]);

  useEffect(() => {
    startMedia();
    return () => stopMedia();
  }, []);

  const startMedia = async () => {
    const media = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    });
    setStream(media);
    if (videoRef.current) videoRef.current.srcObject = media;
  };

  const stopMedia = () => {
    stream?.getTracks().forEach((t) => t.stop());
  };

  const toggleMic = () => {
    stream?.getAudioTracks().forEach((t) => (t.enabled = !mic));
    setMic(!mic);
  };

  const toggleCamera = () => {
    stream?.getVideoTracks().forEach((t) => (t.enabled = !camera));
    setCamera(!camera);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    setChat([...chat, message]);
    setMessage("");
  };

  const uploadDocs = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setDocs([...docs, ...Array.from(e.target.files)]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-lg">Live Online Class</h1>
          <p className="text-xs text-gray-500">
            Secure • Simple • Student Friendly
          </p>
        </div>
        <span className="text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full">
          ● Live
        </span>
      </header>

      {/* MAIN */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* VIDEO */}
        <div className="lg:col-span-2 bg-black rounded-2xl overflow-hidden shadow-sm flex items-center justify-center">
          {camera ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`w-full h-full object-cover transition ${
                blur ? "blur-md" : ""
              }`}
            />
          ) : (
            <p className="text-white text-sm">Camera is off</p>
          )}
        </div>

        {/* SIDE PANEL */}
        <div className="flex flex-col gap-4">
          {/* CHAT */}
          <div className="bg-white rounded-xl shadow-sm flex flex-col h-72">
            <div className="px-4 py-2 border-b text-sm font-medium">
              Class Chat
            </div>
            <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className="bg-blue-100 text-blue-900 px-3 py-1 rounded-lg w-fit"
                >
                  {msg}
                </div>
              ))}
            </div>
            <div className="border-t p-2 flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 border rounded-lg px-3 py-1 text-sm"
              />
              <Button size="sm" onClick={sendMessage}>
                <Send size={14} />
              </Button>
            </div>
          </div>

          {/* DOCUMENTS */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 text-sm font-medium mb-2">
              <FileText size={16} /> Documents
            </div>
            <input type="file" multiple onChange={uploadDocs} />
            <ul className="text-xs mt-2 space-y-1 text-gray-600">
              {docs.map((d, i) => (
                <li key={i}>{d.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* CONTROLS */}
      <footer className="bg-white border-t py-4 flex justify-center gap-6">
        <Control onClick={toggleMic} active={mic} iconOn={<Mic />} iconOff={<MicOff />} />
        <Control onClick={toggleCamera} active={camera} iconOn={<Video />} iconOff={<VideoOff />} />
        <Button
          variant="ghost"
          onClick={() => setBlur(!blur)}
          className={`rounded-full h-12 w-12 ${
            blur ? "bg-blue-100 text-blue-600" : ""
          }`}
        >
          <Shield />
        </Button>
        <Button variant="destructive" className="rounded-full h-12 w-12" onClick={stopMedia}>
          <PhoneOff />
        </Button>
      </footer>
    </div>
  );
}

/* SMALL CONTROL */
function Control({
  active,
  onClick,
  iconOn,
  iconOff,
}: {
  active: boolean;
  onClick: () => void;
  iconOn: React.ReactNode;
  iconOff: React.ReactNode;
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`rounded-full h-12 w-12 transition ${
        active ? "" : "bg-red-100 text-red-600"
      }`}
    >
      {active ? iconOn : iconOff}
    </Button>
  );
}
