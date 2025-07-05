export interface NutritionGoalInterface{
    ID?: number;
    GoalType?: string;
    TargetWeight?: number;
    StartDate?: string;
    EndDate?: string;
    ProteinPercentage?: number;
    FatPercentage?: number;
    CarbPercentage?: number;
    CalculatedTDEE?: number;
    TargetCalories?: number;
    TargetProtein?: number;
    TargetCarbs?: number;
    TargetFat?: number;
    UserID?: number;
}