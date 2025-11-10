export const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("es-ES",{
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(date);
  };
