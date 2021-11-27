export default interface fwQuestionData {
    id: number;
    focus: string;
    category: string;
    content: string;
    skipped?: boolean;
    rate?: number;
}