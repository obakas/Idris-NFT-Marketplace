import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import NFTBox from "./NFTBox"
import Link from "next/link"

interface NFTItem {
  rindexerId: string
  seller: string
  tokenId: string
  nftAddress: string
  price: string
  contractAddress: string
  txHash: string
  blockNumber: number
}

interface NFTBoughtCancelled {
  nftAddress: string
  tokenId: string
}

interface NFTQueryResponse {
  data: {
    allItemListeds: {
      nodes: NFTItem[]
    },
    allItemBoughts: {
      nodes: NFTBoughtCancelled[]
    },
    allItemCanceleds: {
      nodes: NFTBoughtCancelled[]
    }
  }
}

// https://api.rindexer.com/v1/graphql



const GET_RECENT_NFTS = `query AllItemListeds {
  allItemListeds {
    nodes {
      rindexerId
      seller
      tokenId
      nftAddress
      price
      contractAddress
      txHash
      blockNumber
    }
  }
  allItemCanceleds {
    nodes {
      tokenId
      nftAddress
    }
  }
  allItemBoughts {
    nodes {
      tokenId
      nftAddress
    }
  }
}`

async function fetchNFTs(): Promise<NFTQueryResponse> {
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_RECENT_NFTS,
    }),
  })
  return response.json()
}


function useRecentlyListedNFTs() {
  const { data, error, isLoading } = useQuery<NFTQueryResponse>({
    queryKey: ["recentNFTs"],
    queryFn: fetchNFTs,
    // refetchInterval: 10000, // Refetch every 10 seconds
  })

  console.log("DATA", data)

  const nftDataList = useMemo(() => {
    if (!data) return []

    const cancelledNFTs = new Set<string>()
    const boughtNFTs = new Set<string>()

    data.data.allItemCanceleds.nodes.forEach((item) => {
      cancelledNFTs.add(`${item.nftAddress}-${item.tokenId}`)
    })


    data.data.allItemBoughts.nodes.forEach((item) => {
      boughtNFTs.add(`${item.nftAddress}-${item.tokenId}`)
    })


    const availableNFTs = data.data.allItemListeds.nodes.filter(item => {
      if (!item.nftAddress || !item.tokenId) return false
      const nftKey = `${item.nftAddress}-${item.tokenId}`
      return !cancelledNFTs.has(nftKey) && !boughtNFTs.has(nftKey)
    })

    const recentNFTs = availableNFTs.slice(0, 100)

    return recentNFTs.map((nft) => ({
      tokenId: nft.tokenId,
      contractAddress: nft.contractAddress,
      price: nft.price,

      // rindexerId: item.rindexerId,
      // seller: item.seller,
      // nftAddress: item.nftAddress, 
      // txHash: item.txHash,
      // blockNumber: item.blockNumber,
    }))

    // return data.allItemListeds.nodes
  }, [data])

  return { nftDataList, error, isLoading }
}


// Main component that uses the custom hook
export default function RecentlyListedNFTs() {
  const { nftDataList, error, isLoading } = useRecentlyListedNFTs();

  // if (isLoading) {
  //   return <div className="container mx-auto px-4 py-8">Loading...</div>;
  // }

  // if (error) {
  //   return <div className="container mx-auto px-4 py-8">Error loading NFTs.</div>;
  // }

  // if (nftDataList.length === 0) {
  //   return <div className="container mx-auto px-4 py-8">No NFTs available.</div>;
  // }
  // console.log("NFT Data List", nftDataList)

  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-8 text-center">
        <Link
          href="/list-nft"
          className="inline-block py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          List Your NFT
        </Link>
      </div>
      <h2 className="text-2xl font-bold mb-6">Recently Listed NFTs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {nftDataList.map((nft) => (
          <Link href={`/buy-nft/${nft.contractAddress}/${nft.tokenId}`}
            key={`${nft.contractAddress}-${nft.tokenId}`}>
          <NFTBox
            key={`${nft.contractAddress}-${nft.tokenId}`}
            tokenId={nft.tokenId}
            contractAddress={nft.contractAddress}
            price={nft.price}
          />
          </Link>
        ))}
        {/* <img
          src="/placeholder.png"
          alt={`NFT`}
          className="w-full h-auto max-h-96 object-contain bg-zinc-50"
          onError={() => {
            console.error("Error loading NFT image")
          }}
        /> */}
      </div>
    </div>
  )
}