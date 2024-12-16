export const getFlagColors = (flag: string): string[] => {
    switch (flag) {
      case "pride":
        return [
          "#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8B00FF"
        ];
      case "bisexual":
        return [
          "#D5006D", "#9B4F96", "#0038A8"
        ];
      case "pansexual":
        return [
          "#FF218C", "#FFD800", "#1D7BF2"
        ];
      case "transgender":
        return [
          "#55CDFC", "#F7A8B8", "#55CDFC", "#F7A8B8"
        ];
      case "asexual":
        return [
          "#9B59B6", "#F1C40F", "#2ECC71", "#3498DB", "#34495E"
        ];
      case "genderfluid":
        return [
          "#D5006D", "#9B4F96", "#9B59B6", "#3498DB", "#2ECC71"
        ];
      case "lesbian":
        return [
          "#D5006D", "#FF7F50", "#FFB6C1", "#F2A8B1", "#8B3B3F"
        ];
      case "nonbinary":
        return [
          "#FCF200", "#9B59B6", "#F1C40F", "#2ECC71", "#34495E"
        ];
      case "queer":
        return [
          "#9B59B6", "#F1C40F", "#2ECC71", "#3498DB"
        ];
      case "intersex":
        return [
          "#F1C40F", "#9B59B6"
        ];
      default:
        return [
          "#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8B00FF"
        ];
    }
  }
  