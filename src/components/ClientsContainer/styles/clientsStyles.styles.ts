export const clientsStyles = {
  chevronLeft: {
    position: "relative",
    height: "32px",
    width: "inherit",
    m: "16px 24px",
    alignItems: "center",
    boxSizing: "border-box",
    textAlign: "center",
    border: "1px solid #DBDCE0",
    transition: "width 0.3s",
    "&.chevronCollapsed": {
      right: "7px",
      width: "32px",
    },
    "&:hover": {
      backgroundColor: "#e1e3e7",
    },
  } as const,
  clientsContainer: {
    position: "relative",
    height: "100vh",
  } as const,
  clientsContainerSidebar: {
    position: "sticky",
    top: 0,
    height: "100vh",
    backgroundColor: "success.light",
    pt: "24px !important",
    zIndex: 10,
    transition: "width 0.3s",
    "&.sidebarCollapsed": {
      width: "64px",
    },
  } as const,
  avatarStyle: {
    height: "48px",
    width: "48px",
    borderRadius: "50%",
    objectFit: "cover",
    boxSizing: "content-box",
  } as const,
  avatarCollapsed: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    objectFit: "cover",
    boxSizing: "content-box",
  } as const,
  menu: {
    left: "70px", 
    top: "-100px",
    marginTop: "40px",
    borderRadius: "8px",
    "& .MuiMenuItem-root": {
      fontSize: "16px",
      fontFamily: "Inter",
      m: "10px 0px",
      pl: "30px",
      pr: "30px",
    },
  },
  stack: {
    cursor: "pointer",
    "&:hover": {
      "& .profileText": {
        color: "primary.main",
      },
      "& .avatarClass": {
        border: "2px solid",
        borderColor: "primary.main",
        m: "-2px",
      },
    },
  } as const,
  stackClicked: {
    position: "relative",
    top: "450px",
    cursor: "pointer",

    "&::after": {
      content: "normal",
      position: "absolute",
      bottom: "0px",
      top: "50%",
      width: "3px",
      backgroundColor: "primary.main",
    },
    "& .profileText": {
      color: "primary.main",
    },
    "& .avatarClass": {
      border: "2px solid",
      borderColor: "primary.main",
      m: "-2px",
    },
  } as const,
  clientNameCell: {
    fontFamily: "typography.fontFamily",
    fontSize: "14px",
    lineHeight: "16px",
    color: "secondary.main",
    fontWeight: 800,
    height: "16px",
    textDecorationLine: "underline",
    cursor: "pointer",
  },
  helloText: {
    fontFamily: "typography.fontFamily",
    fontWeight: 400,
    color: "secondary.light",
    fontSize: "12px",
    pt: "10px",
  },
  sidebarFullName: {
    fontFamily: "fontFamily",
    fontWeight: 800,
    color: "secondary.main",
    fontSize: "14px",
    lineHeight: "16px",
  },
  sidebarProfileBox: {
    ml: "24px",
    width: "55px",
    height: "50px",
    pt: "10px",
    borderRight: "2px",
  },
  sidebarProfileBoxCollapsed: {
    textAlign: "center",
    ml: "10px",
    mb: "30px",
    width: "44px",
    height: "44px",
    pt: "10px",
    borderRight: "2px",
    cursor: "pointer",
    "&:hover": {
      "& .avatarClass": {
        border: "2px solid",
        borderColor: "primary.main",
        m: "-2px",
      },
    },
  } as const,
  sidebarMenuItemName: {
    fontFamily: "Inter",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 400,
    color: "secondary.main",
  },

  sidebarMenuItemStyle: {
    direction: "ltr",
    minHeight: "63px",
    alignItems: "center",
    p: "20px 0px",
    cursor: "pointer",
    "&:hover": {
      "& .menuName": {
        color: "primary.main",
      },
      "& .iconMenuStyle": {
        color: "primary.main",
      },
    },
  } as const,
  selectedClientSidebarStyle: {
    direction: "ltr",
    minHeight: "63px",
    alignItems: "center",
    ml: "24px",
    p: "18px 0px",
    cursor: "pointer",
    borderTop: "0.5px solid",
    borderTopColor: "secondary.contrastText",
    borderBottom: "0.5px solid",
    borderBottomColor: "secondary.contrastText",
    "&:hover": {
      "& .iconMenuStyle": {
        color: "primary.main",
      },
    },
  } as const,
  viewAllClientsStyle: {
    color: "primary.main",
    fontWeight: 800,
    textDecorationLine: "underline !important",
    textDecorationColor: "primary.main",
  },
  selectedClientSideBarStyle: {
    color: "secondary.main",
    fontSize: "16px",
    cursor: "pointer",
    lineHeight: "24px",
    fontWeight: 700,
  },
  sideBarItemStackStyle: {
    pl: "24px",
    overflowY: "auto",
    maxHeight: "320px",
    direction: "rtl",
    "&::-webkit-scrollbar": {
      width: "6px",
      height: "0.5rem",
      backgroundColor: "#dbdce0",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "secondary.light",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#b7b7b7",
      borderRadius: "10px",
    },
  } as const,
  selectedClientMenuStyle: {
    left: "38px",
    marginTop: 0,
    borderRadius: "8px",
    "& .MuiMenuItem-root": {
      fontSize: "16px",
      fontFamily: "Inter",
      m: "10px 0px",
      pl: "30px",
      pr: "30px",
    },
  },
};
