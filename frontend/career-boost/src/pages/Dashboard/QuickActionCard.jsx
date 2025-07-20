import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, ArrowRight } from "lucide-react";

const QuickActionCard = ({
  title,
  description,
  icon,
  bgColor = "from-indigo-50 to-indigo-100/60",
  borderColor = "border-indigo-200",
  hoverBorderColor = "hover:border-indigo-300",
  hoverShadowColor = "hover:shadow-indigo-100/50",
  buttonBgColor = "bg-indigo-600",
  buttonTextColor = "text-white",
  buttonHoverBgColor = "hover:bg-indigo-700",
  accentColor = "text-indigo-600",
  onAction
}) => (
  <Card 
    className={`
      w-full max-w-2xl cursor-pointer transition-all duration-300 ease-in-out
      bg-gradient-to-br ${bgColor} ${borderColor} ${hoverBorderColor} ${hoverShadowColor}
      hover:shadow-lg sm:hover:shadow-xl md:hover:shadow-xl lg:hover:shadow-2xl 
      hover:-translate-y-0.5 sm:hover:-translate-y-0.5 md:hover:-translate-y-1 group
    `}
    onClick={onAction}
  >
    <CardContent className="p-2 sm:p-5 md:p-6 lg:p-7 xl:p-8">
      <div className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        <div className="flex flex-col justify-center space-y-2 sm:space-y-3 md:space-y-3.5 lg:space-y-4 flex-1 min-w-0">
          <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
            <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight group-hover:text-gray-800 transition-colors">
              {title}
            </h2>
            <p className="text-gray-600 text-sm sm:text-sm md:text-base leading-relaxed">
              {description}
            </p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
            <Button className={`
              inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 md:px-4 py-1.5 sm:py-2 md:py-2.5 
              rounded-lg sm:rounded-lg md:rounded-xl font-medium text-xs sm:text-sm 
              transition-all duration-200 shadow-sm
              ${buttonBgColor} ${buttonTextColor} ${buttonHoverBgColor}
              transform group-hover:scale-105 group-hover:shadow-md
            `}>
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              <span>Start Building</span>
            </Button>
            
            <div className={`
              p-1.5 sm:p-1.5 md:p-2 rounded-lg sm:rounded-lg md:rounded-xl transition-all duration-200
              ${accentColor} opacity-0 group-hover:opacity-100 
              group-hover:translate-x-1 hidden sm:block
            `}>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            </div>
          </div>
        </div>
        
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-white/20 rounded-lg sm:rounded-xl md:rounded-xl lg:rounded-2xl transform rotate-2 sm:rotate-2 md:rotate-3 group-hover:rotate-3 md:group-hover:rotate-4 lg:group-hover:rotate-6 transition-transform duration-300"></div>
          <img 
            src={icon} 
            alt="" 
            className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default QuickActionCard;