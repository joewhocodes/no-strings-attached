import './App.css';

const LogIn = () => {
    return (
        <main class="container">
            <div class="row justify-content-center">
                <section class="col-6 mt-5">
                    <form action="/login" method="POST">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="email"
                            />
                        </div>
                        <div class="mb-3">
                            <label
                                for="exampleInputPassword1"
                                class="form-label"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                class="form-control"
                                id="exampleInputPassword1"
                                name="password"
                            />
                        </div>
                        <button type="submit" class="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
};

export default LogIn;
