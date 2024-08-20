export async function getData(url: string, revalidate?: number) {
  try {
    const res = await fetch(url, {
      next: { revalidate: revalidate ? revalidate : 60 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch Data");
    }
    return res.json();
  } catch (error: any) {
    console.log(error.message);
  }
}

export const auth = async (url: string, body: any) => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      method: "POST",
      body: body,
    });

    const data = await res.json();
    if (!data.errors) {
      const {
        success,
        data: { token_type, access_token },
      } = data;
      sessionStorage.setItem("auth", `${token_type} ${access_token}`);
      return success;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Failed to auth");
    }
  }
};

export const check = async (url: string, body: any) => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      method: "POST",
      body: body,
    });

    if (res.status === 422) {
      const data = await res.json();
      return data.errors;
    }

    const data = await res.json();
    if (!data.errors) {
      const {
        success,
        data: { token_type, access_token },
      } = data;
      if (sessionStorage.getItem("auth") === null) {
        sessionStorage.setItem("auth", `${token_type} ${access_token}`);
      }
      return success;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Failed to login");
    }
  }
};

export const getUser = async (url: string, token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DEV_API}/user/info`, {
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Failed to fetch user data");
    }
  }
};

export function numberFormatter(val: number) {
  return new Intl.NumberFormat("fr-FR", {}).format(val);
}

export function timeParser(expiredDate: string) {
  const endTime = +new Date(expiredDate) / 1000;
  const elapsed = +new Date() / 1000;
  const totalSec = endTime - elapsed;
  const hours = totalSec / 3600;
  const minutes = (totalSec / 60) % 60;

  return {
    hours,
    minutes,
  };
}
