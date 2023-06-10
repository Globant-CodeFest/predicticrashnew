import Nav from "@/components/Nav";

export default function Home ({ country }) {
    console.log(country);
    return (
        <>
            <Nav />
        </>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { country } = params;
    return { props: { country } };
}