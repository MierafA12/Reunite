import Image from "next/image";
import { User, Calendar, MapPin, Flag, Play, Activity, LucideIcon } from "lucide-react";

export const InfoCard = ({
    label,
    value,
    icon: Icon
}: {
    label: string;
    value: string;
    icon?: LucideIcon
}) => (
    <div className="bg-dark-light/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center transition-all hover:bg-dark-light hover:border-secondary/50 group">
        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
            {Icon ? <Icon className="w-6 h-6 text-secondary" /> : <Activity className="w-6 h-6 text-secondary" />}
        </div>
        <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">{label}</p>
        <p className="text-xl font-bold mt-2 text-white text-center">{value}</p>
    </div>
);

export const ImageBox = ({ src }: { src?: string }) => (
    <div className="relative h-48 rounded-2xl overflow-hidden border border-white/5 group bg-dark-light">
        <Image
            src={src || "/images/sample.jpg"}
            alt="Missing"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
);

export const VideoBox = () => (
    <div className="relative h-48 bg-dark-light border border-white/5 rounded-2xl flex flex-col items-center justify-center group cursor-pointer overflow-hidden">
        <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary transition-colors z-10">
            <Play className="w-6 h-6 text-secondary group-hover:text-white fill-current" />
        </div>
        <span className="mt-3 text-sm font-medium text-gray-400 group-hover:text-white transition-colors z-10">Play Video</span>
        <div className="absolute inset-0 bg-secondary/5 blur-2xl group-hover:bg-secondary/10 transition-colors" />
    </div>
);

export const Comment = ({ author, date, text }: { author?: string; date?: string; text?: string }) => (
    <div className="bg-dark-light/30 border border-white/5 rounded-2xl p-6 hover:bg-dark-light/50 transition-colors">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
            </div>
            <div>
                <h4 className="text-sm font-bold text-white">{author || "Anonymous Driver"}</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{date || "2 hours ago"}</p>
            </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
            {text || "I saw someone matching this description near Merkato last week. They were talking to a vendor near the bus station."}
        </p>
    </div>
);
