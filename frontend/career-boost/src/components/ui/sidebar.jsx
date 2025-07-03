import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sidebarVariants = cva(
  "group relative flex h-full w-full flex-col gap-4 border-r bg-background p-4",
  {
    variants: {
      variant: {
        default: "border-border",
        secondary: "border-border/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Sidebar = React.forwardRef(({ className, variant, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn(sidebarVariants({ variant }), className)}
    {...props}
  />
))
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn("flex h-[60px] items-center px-2", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarHeaderTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg tracking-tight", className)}
    {...props}
  />
))
SidebarHeaderTitle.displayName = "SidebarHeaderTitle"

const SidebarHeaderDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SidebarHeaderDescription.displayName = "SidebarHeaderDescription"

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-1 flex-col gap-2", className)} {...props} />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props} />
))
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "mb-2 px-2 text-xs font-semibold tracking-tight text-muted-foreground",
      className
    )}
    {...props}
  />
))
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarNav = React.forwardRef(({ className, ...props }, ref) => (
  <nav ref={ref} className={cn("flex flex-1 flex-col gap-2", className)} {...props} />
))
SidebarNav.displayName = "SidebarNav"

const SidebarNavItem = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
))
SidebarNavItem.displayName = "SidebarNavItem"

const SidebarNavLink = React.forwardRef(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent [&.active]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
SidebarNavLink.displayName = "SidebarNavLink"

const SidebarNavButton = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent [&.active]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
SidebarNavButton.displayName = "SidebarNavButton"

const SidebarNavIcon = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mr-2 h-4 w-4 text-muted-foreground", className)}
    {...props}
  />
))
SidebarNavIcon.displayName = "SidebarNavIcon"

const SidebarNavText = React.forwardRef(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("", className)} {...props} />
))
SidebarNavText.displayName = "SidebarNavText"

const SidebarNavSection = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
))
SidebarNavSection.displayName = "SidebarNavSection"

const SidebarNavSectionTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "mb-2 px-2 text-xs font-semibold tracking-tight text-muted-foreground",
      className
    )}
    {...props}
  />
))
SidebarNavSectionTitle.displayName = "SidebarNavSectionTitle"

const SidebarNavSectionContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
))
SidebarNavSectionContent.displayName = "SidebarNavSectionContent"

const SidebarFooterText = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("px-2 py-2 text-xs text-muted-foreground", className)}
    {...props}
  />
))
SidebarFooterText.displayName = "SidebarFooterText"

export {
  Sidebar,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarHeaderDescription,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarNav,
  SidebarNavItem,
  SidebarNavLink,
  SidebarNavButton,
  SidebarNavIcon,
  SidebarNavText,
  SidebarNavSection,
  SidebarNavSectionTitle,
  SidebarNavSectionContent,
  SidebarFooterText,
} 