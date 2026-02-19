const errorMiddleware = (error,req,res,next)=>{
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error!";

    console.error("ERROR :- ", error)

    return res.status(statusCode).json(
        {
            success:false,
            message
        }
    );
};

export { errorMiddleware }