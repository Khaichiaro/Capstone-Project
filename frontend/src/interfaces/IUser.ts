import type { GenderInterface } from "./IGender";

export interface UserInterface {
    ID?: number;
    Email?: string;
    Password?: string;
    GenderID?: number;
    ActivityLevelID?: number;
    LevelID?: number;
    Gender?: GenderInterface;
}