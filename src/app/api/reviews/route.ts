import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Database } from "../../../lib/database.types";

// Force dynamic rendering for this route
export const dynamic = "force-dynamic";

// Use service role key for API routes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
  throw new Error("Missing Supabase URL configuration");
}

if (!supabaseKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
  throw new Error("Missing Supabase service role key configuration");
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "6");
    const start = (page - 1) * pageSize;

    // Get total count
    const { count, error: countError } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true });

    if (countError) {
      console.error("Error getting review count:", countError);
      return NextResponse.json(
        { error: "Failed to get review count" },
        { status: 500 }
      );
    }

    // Get paginated reviews
    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .select("*")
      .order("time", { ascending: false })
      .range(start, start + pageSize - 1);

    if (reviewsError) {
      console.error("Error fetching reviews:", reviewsError);
      return NextResponse.json(
        { error: "Failed to fetch reviews" },
        { status: 500 }
      );
    }

    // Get overall rating
    const { data: ratingData, error: ratingError } = await supabase
      .from("reviews")
      .select("rating");

    if (ratingError) {
      console.error("Error getting ratings:", ratingError);
      return NextResponse.json(
        { error: "Failed to get ratings" },
        { status: 500 }
      );
    }

    const averageRating =
      ratingData?.reduce((acc, curr) => acc + curr.rating, 0) || 0;
    const totalRating =
      ratingData?.length > 0 ? averageRating / ratingData.length : 0;

    return NextResponse.json({
      reviews: reviews || [],
      rating: parseFloat(totalRating.toFixed(1)),
      total_reviews: count || 0,
    });
  } catch (error) {
    console.error("Error in reviews API:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch reviews",
      },
      { status: 500 }
    );
  }
}
