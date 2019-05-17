export interface Media {
    audio: string;
    duracion: number;
    reproduciendo: boolean;
}

export const SOUNDS = [
    {
        //0 => Explotion
        audio: "assets/sounds/explotion.wav",
        duracion: 4,
        reproduciendo: false
    },
    {
        //1 => Ticking
        audio: "assets/sounds/ticking.wav",
        duracion: 9,
        reproduciendo: false
    },
    {
        //2 => Whip
        audio: "assets/sounds/whip.wav",
        duracion: 2,
        reproduciendo: false
    },
    {
        //3 => Minecraft
        audio: "assets/sounds/minecraft.wav",
        duracion: 4,
        reproduciendo: false
    }
];