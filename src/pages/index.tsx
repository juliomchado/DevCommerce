import { GetServerSideProps } from 'next';
import { Title } from '@/styles/pages/Home';
import SEO from '@/components/SEO';

interface IProduct {
  id: string;
  title: string;
}

interface IHomeProps {
  recommendedProducts: IProduct[];
}


export default function Home({ recommendedProducts }: IHomeProps) {

  return (
    <div>
      <SEO 
      title="DevCommerce, your best e-commerce!" 
      shouldExcludeTitleSuffix
      image="random.png"
      />

      <section>
        <Title>Products</Title>


        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
            )
          })}
        </ul>
      </section>

    </div>
  )
}


export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}