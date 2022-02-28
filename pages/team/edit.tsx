import { useRouter } from "next/router";
import Layout from "../../modules/layout/layout";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  return <Layout crumbs={["Team", id as string]}>{id}</Layout>;
};

export default Edit;
